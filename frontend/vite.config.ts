import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, path.resolve(__dirname, '..'), '');

    console.log(env);
    return {
        plugins: [vue()],
        define: {
            'process.env': env,
        },
        server: {
            port: Number(process.env.VITE_PORT) || 5173,
        },
    };
});
