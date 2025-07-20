import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: ["frontend.shopmate.sctp-sandbox.com", "shopmate-dev-alb-1783686905.ap-southeast-1.elb.amazonaws.com"],
    fs: {
      strict: false
    }
  },
  preview: {
    port: 80,
    host: true,
    strictPort: true
  },
  optimizeDeps: {
    disabled: true
  },
});
