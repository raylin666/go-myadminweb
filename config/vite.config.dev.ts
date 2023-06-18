import { loadEnv, mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

const mode = 'development';

// 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
const env = loadEnv(mode, process.cwd(), '')

export default mergeConfig(
  {
    mode: mode,
    server: {
      open: true,
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
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig
);
