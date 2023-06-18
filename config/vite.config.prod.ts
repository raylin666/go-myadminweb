import { loadEnv, mergeConfig } from 'vite';
import baseConfig from './vite.config.base';
import configCompressPlugin from './plugin/compress';
import configVisualizerPlugin from './plugin/visualizer';
import configArcoResolverPlugin from './plugin/arcoResolver';
import configImageminPlugin from './plugin/imagemin';

const mode = 'production';

// 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
const env = loadEnv(mode, process.cwd(), '')

export default mergeConfig(
  {
    mode: mode,
    server: {
      open: false,
      fs: {
        strict: true,
      },
      port: 5173,
      proxy: {
        [env.VITE_API_BASE_URL]: {
          target: env.VITE_API_BASE_PROXY_PASS,
          changeOrigin: true,
          rewrite: (path: any) =>
            path.replace(new RegExp(`^${env.VITE_API_BASE_URL}`), ''),
        },
      },
    },
    plugins: [
      configCompressPlugin('gzip'),
      configVisualizerPlugin(),
      configArcoResolverPlugin(),
      configImageminPlugin(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            arco: ['@arco-design/web-vue'],
            chart: ['echarts', 'vue-echarts'],
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
          },
        },
      },
      chunkSizeWarningLimit: 2000,
    },
  },
  baseConfig
);
