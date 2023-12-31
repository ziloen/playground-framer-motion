import react from '@vitejs/plugin-react-swc'
import { resolve as r } from 'node:path'
import PostcssPresetEnv from 'postcss-preset-env'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'


export default defineConfig(({ command }) => (console.log(command), {
  base: '/playground-framer-motion/',
  resolve: {
    alias: {
      '~': r('src')
    }
  },

  plugins: [
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    react(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      dirs: 'src/pages',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        {
          react: [
            'useState',
            'useEffect',
            'useMemo',
            'useLayoutEffect',
            'useCallback',
            'useRef',
            'forwardRef',
            'useImperativeHandle',
            'Suspense'
          ],
          'react-router-dom': ['useNavigate', 'useParams', 'NavLink', 'useRoutes'],
          'framer-motion': ['motion', 'AnimatePresence'],
        },
      ],
      dts: 'src/types/auto-imports.d.ts'
    })
  ],

  css: {
    postcss: {
      plugins: [PostcssPresetEnv({ stage: 0 })]
    }
  },

  optimizeDeps: {
    include: [
      'framer-motion',
      'ahooks',
      'ahooks/lib/utils/domTarget',
      'ahooks/lib/utils/useEffectWithTarget'
    ]
  },
}))
