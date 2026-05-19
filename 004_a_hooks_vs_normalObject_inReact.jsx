// 🧠 -----------------------------  Normal JS vs React hooks
// Normal JS (no React magic)
// const obj = {}
// const arr = []
// const fn = () => {}

// 👉 Har baar function run hua → naya object/array/function banta hai
// Kyuki JS engine simple hai: memory allocate and new reference return.

// ⚛️ ------------------------------ React me hooks different kyun hain?
// React ke hooks:
// useState
// useRef
// useEffect
// useMemo

// 👉 Ye normal JS functions nahi hain internally
// 👉 Ye React ke “Fiber system” se connected hote hain


// 🧠 ------------------------------- Core concept for hooks on re-render: 
// On every render, new hook instance/refernce create nhi hota,
// 👉 Hooks same instance return karte hain (reuse)
// 👉 BUT har hook ka behavior different hota hai

// 🔥 ----------------- Har hook ka real behavior
// ✅ useState
// const [count, setCount] = useState(0)
// React stores value in Fiber
// re-render → same hook slot, but value = latest snapshot
// 👉 returns:new value per render (snapshot)

// ✅ useRef******
// const ref = useRef(0)
// SAME object reused, only .current updated manually
// 👉 returns: same object every render
// hence isko aese mt smjhna ki normal object hai, and normal object ki trh new object return hoga on render

// ✅ useEffect
// useEffect(() => {}, [])
// stores effect function in Fiber that runs after render, not recreated logic-wise unless deps change

// ✅ useMemo / useCallback
// useMemo(() => compute(), [dep])
// useCallback(() => {}, [dep])
// cache previous result/function
// return same reference if deps unchanged

// 🧠 5. BIG IDEA (MOST IMPORTANT)
// React hooks are NOT “new objects every render”
// 👉 they are: “stored memory slots inside Fiber”