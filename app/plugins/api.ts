export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const auth = useAuthStore();

  const $api = $fetch.create({
    baseURL: config.public.apiUrl as string,

    onRequest({ options }) {
      const headers = (options.headers = new Headers(options.headers));
      headers.set("Accept", "application/json");
      headers.set("X-Requested-With", "XMLHttpRequest");

      if (auth.getToken) {
        headers.set("Authorization", `Bearer ${auth.getToken}`);
      }
    },

    onResponse({ response }) {
      if (process.client && response._data instanceof Blob) {
        const contentDisposition = response.headers.get("content-disposition");

        let fileName = "download.pdf";

        if (contentDisposition) {
          const match = contentDisposition.match(/filename="(.+?)"/);
          if (match && match[1]) fileName = match[1];
        }

        const blob = new Blob([response._data]);
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();

        URL.revokeObjectURL(link.href);
      }
    },

    onRequestError({ error }) {
      if (import.meta.server) return;
      if (error.name === "AbortError") return;

      useToast().add({
        icon: "i-lucide-octagon-alert",
        color: "warning",
        title: error.message ?? "Something went wrong",
      });
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        useToast().add({
          title: "Please log in to continue",
          icon: "i-lucide-octagon-alert",
          color: "primary",
        });
      }
    },
  });

  return {
    provide: {
      api: $api,
    },
  };
});
