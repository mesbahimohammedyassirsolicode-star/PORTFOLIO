import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === "serve";

  const devCsp =
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.emailjs.com ws://localhost:* ws://127.0.0.1:* http://localhost:* http://127.0.0.1:*; object-src 'none'; frame-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; manifest-src 'self'";
  const previewCsp =
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.emailjs.com; object-src 'none'; frame-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; manifest-src 'self'; upgrade-insecure-requests";

  return {
    plugins: [react(), tailwindcss()],
    build: {
      target: "es2020",
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
              return "react-vendor";
            }
            if (id.includes("node_modules/framer-motion")) {
              return "motion-vendor";
            }
            if (id.includes("node_modules/lucide-react")) {
              return "icons-vendor";
            }
            return undefined;
          },
        },
      },
    },
    server: {
      headers: {
        "Content-Security-Policy": isDev ? devCsp : previewCsp,
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Cross-Origin-Resource-Policy": "same-origin",
        "Cross-Origin-Opener-Policy": "same-origin",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      },
    },
    preview: {
      headers: {
        "Content-Security-Policy": previewCsp,
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
        "Cross-Origin-Resource-Policy": "same-origin",
        "Cross-Origin-Opener-Policy": "same-origin",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      },
    },
  };
});
