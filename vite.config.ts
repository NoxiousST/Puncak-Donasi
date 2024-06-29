import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        manifest: true,
        rollupOptions: {
            input: './src/main.jsx',
        },
    },
    server: {
        port: 4242,
        proxy: {
            // string shorthand
            // with options
            "/api": {
                target: "http://localhost:5252",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
})
