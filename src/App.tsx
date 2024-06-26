import { MotionConfig } from 'framer-motion'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import routes from '~react-pages'

function Routes() {
  return useRoutes(routes)
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <MotionConfig transition={{ type: 'tween' }}>
        <Suspense>
          <AnimatePresence mode="wait" initial={false}>
            <Routes />
          </AnimatePresence>
        </Suspense>
      </MotionConfig>
    </BrowserRouter>
  )
}
