import { AutoHeightPanel } from '~/components'

const tabNames = [
  'i-fluent-emoji:cat',
  'i-fluent-emoji:black-cat',
  'i-fluent-emoji:cat-face',
  'i-fluent-emoji:cat-with-wry-smile',
  'i-fluent-emoji:cat-with-tears-of-joy',
]

export default function TabView() {
  const [index, setIndex] = useState(0)
  const currentTabName = tabNames[index]
  const [col, setCol] = useState(`${index + 1} / span 1`)
  const isAnimatingRef = useRef(false)

  function onChange(nextIndex: number) {
    isAnimatingRef.current = true
    const start = Math.min(nextIndex, index) + 1
    const end = Math.max(nextIndex, index) + 2
    setIndex(nextIndex)
    setCol(`${start} / ${end}`)
  }

  function onAnimationEnd() {
    if (!isAnimatingRef.current) return
    isAnimatingRef.current = false
    setCol(`${index + 1} / span 1`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      {/* Back to home */}
      <NavLink to='/'>← Home</NavLink>

      <div className='grid auto-flow-col gap-2 grid-auto-cols-max relative'>
        {/* Active indicator */}
        {/* or use layoutId + classsName="absolute inset-0" */}
        <motion.div
          layout
          layoutDependency={col}
          className='bg-[#005E5D] h-full absolute w-full'
          onLayoutAnimationComplete={onAnimationEnd}
          transition={{ type: 'tween', duration: .15, ease: 'easeInOut' }}
          style={{
            gridColumn: col,
            gridRow: 1,
            borderRadius: 9999,
          }}
        />

        {/* Tab labels */}
        {tabNames.map((tabName, i) =>
          <div
            key={tabName}
            className='flex cursor-pointer z-0 px-2 py-1 select-none'
            onClick={() => index !== i && onChange(i)}
          >
            <div className={tabName}></div>
            <div>{tabName}</div>
          </div>
        )}
      </div>


      <div className='mt-2 bg-gradient-to-r bg-gradient-from-[#9059FF] bg-gradient-to-[#0250BC] '>
        {/* add relative to hidden overflow when exit anmation */}
        <AutoHeightPanel className='relative overflow-hidden'>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              // set key to force remount trigger animation
              key={index}
              className='flex-center flex-col gap-2 py-4 bg-black/25'
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -200 }}
            >
              <div className={currentTabName}></div>
              <div className='write-vertical-left whitespace-nowrap'>{currentTabName}</div>
            </motion.div>
          </AnimatePresence>
        </AutoHeightPanel>
      </div>
    </motion.div>
  )
}