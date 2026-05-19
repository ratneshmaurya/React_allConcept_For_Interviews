
// ================================================ USESTATE ========================================================
// ==================================================================================================================

// useState React ka: state management hook hai.
// It allows component to: store data, update UI, preserve values between renders

// React compares dependencies using: Object.is(). Mostly reference comparison. so agr 
// primitve value hai, then changing values are okay, but if agr object/array hai then must change using spread 
// operator to have new object refenrce.

// If changing value: should update UI AND RE-RENDER THEN 👉 useState.

// Re-render pe: component function reruns, BUT: state reset nahi hoti because React stores state separately internally.

// 🧠-----------  Deep Internal Understanding
// setState: immediately DOM update nahi karta
// It: schedules update
// React later: batches updates, reconciles, renders efficiently
// 💣 So: all changes happens in next render only, not change current snapshot or render
// const [count, setCount]=useState(0);
// console.log(count)
// setCount(1)
// console.log(count)
// Both logs show: old value, Because update async-ish hota hence it is done a little later.
// so next render me again agr ye code run hua, toh firse console log me new updated value aaegi and print hoga
// but agr ye code nhi run hua, if onclick me ho ya khi aese function me jo firse next render pr apne aap run na ho then 
// print nhi hoga. Example see below -
function App() {
  const [count, setCount] = useState(0)
  console.log("render", count)  // this will be printed in every render becoz part of functional component

  return (
    <button onClick={() => {
      console.log(count) // this will only be printed once button clicked and current snapshot ki value, not render ke baad ki new
      setCount(1)
      console.log(count) // even if functional update (prev=> prev+1) bhi kroge setState me toh bhi old value dega, becoz 
      // current snapshot ki value change thodi ho rhi hai
    }}>
      Click
    </button>
  )
}

// setState(): current snapshot ko modify nahi karta, next render queue karta hai
// Ye React ka core behavior hai.

// Common Mistake to Remember ----------------------
// 1-) -------------- Mutating objects directly
// user.name = "ratnesh", ❌ Wrong
// setUser(user)
// Why bad? Reference same.
// React may think: nothing changed

// ✅ Correct way is spreading things
// setUser({
//   ...user,
//   name: "ratnesh"
// })
// 🧠 React state updates rely heavily on: reference changes
// React compares dependencies using: Object.is(). Mostly reference comparison. so agr 
// primitve value hai, then changing values are okay, but if agr object/array hai then must change using spread 
// operator to have new object refenrce.

// 2-) --------------- Using stale state
// ❌ Bad
// const [count, setCount]=useState(0);
// setCount(count + 1)
// setCount(count + 1)
// Both use count=0, i.e current snapshot se count ki value=0, lekr wo callback queue me chle gye.

// ✅ Correct
// setCount(prev => prev + 1)
// setCount(prev => prev + 1)
// Why?

// VERY DEEP UNDERSTANDING :
// React state updates often async + batched(ek se jyada setState ho toh sbko ek saath krta hai) hote hain.
// React immediately state mutate nahi karta. Wo queue maintain karta hai.

// Functional updates: queue-safe hote hain
// setCount(prev => prev + 1)
// Yaha tum directly value nahi de rahe. Tum React ko ek function*** de rahe ho, not any count value:
// (prev) => prev + 1
// Aur React later us function ko latest state ke saath call karega.
// Helpful kb hoga ye functional Updates ?
// a-)**** Jab multiple setSatate() changes ho, so that next wala setState() prev wale setState() ke changes ke upr kaam kre
// eg - setCount(count + 1)
// then again: setCount(count + 1)
// b-)*** Jab asyn code ho (setTimeout ya setInterval) ke andr we are using setState(), then vha bhi functional update kro
setTimeout(() => {
  setCount(prev => prev + 1)
}, 1000)

setInterval(() => {
  setCount(prev => prev + 1)
}, 1000)

// Timer lagaya
// setTimeout(() => {
//   setCount(prev => prev + 1)
// }, 5000)

// Abhi: function (prev=> prev+1) callback queue me gaya, BUT function execute nahi hua
// In 5 sec beech me:
// setCount(5)
// setCount(10)
// setCount(20)

// Final state eventually: 20
// 5 sec baad timeout callback run hua: prev => prev + 1
// Ab React kya karega?
// Ye nahi: 0 + 1, Kyuki 0 capture nahi hua tha.

// Instead: React internally karega: latestState = 20
// newState = updater(20), Result: 21
// WHY?? Kyuki queued thing was: prev => prev + 1
// NOT:1

// ALSO useRef ke help se bhi stale values problem solved.  (check preventing stale closure in react file, or see useRef below)


// ==================================================================================================================
// ================================================= USE EFFECT======================================================

// why useEffect ? becoz after rendering or first UI loads, we want to execute some side effects like - Like:
// API calls, timers, event listeners, localStorage, sockets, subscriptions

// React compares dependencies using: Object.is(). Mostly reference comparison. so agr 
// primitve value hai, then changing values are okay, but if agr object/array hai then must change using spread 
// operator to have new object refenrce.

// useEffect runs only after UI paints completed or rendering done.
// render -> DOM update -> paint -> useEffect

// Dependency Array ka concept in UseEffect[] :
// 1-) No dependency array used, then runs after every render. Why?, Because React assumes: effect depends on everything
// 2-) Empty dependency array[], then Runs: only after first mount. because: dependencies never change
// 💣 But NOT truly “once”
// If component: unmounts then remounts, effect runs again.=
// 3-) Specific dependency [Count]: Runs when: count changes
// 🧠 React compares dependencies using: Object.is(). Mostly reference comparison. so agr 
// primitve value hai, then changing values are okay, but if agr object/array hai then must change using spread 
// operator to have new object refenrce.


// First render pe run hona zaruri? NO., Can prevent using useRef.current value.
// Example:
// const firstRender = useRef(true)
// useEffect(() => {
//   if (firstRender.current) {
//     firstRender.current = false
//     return
//   }
//   console.log("skip first render")
// }, [count])

// 🧠 Why needed?
// Sometimes:
// API call only after user interaction
// avoid initial unnecessary sync

// ----------------------------- MISTAKES:
// CASE:1 - Infinite loops :
// Example : as dependecy on same variable and then using setState inside it to same variable, so it goes on rendering infinite
useEffect(() => {
  setCount(count + 1)
}, [count])

// CASE:2 - Ignoring cleanup i.e : return()=> clearInterval(id);
useEffect(() => {
  setInterval(() => {
    console.log("running")
  }, 1000)
}, [])
// Why dangerous? Every mount: new interval survives forever, as we are not clearning the previous intervals




// ==================================================================================================================
// ================================================= USE REF ========================================================

// React compares dependencies using: Object.is(). Mostly reference comparison. so agr 
// primitve value hai, then changing values are okay, but if agr object/array hai then must change using spread 
// operator to have new object refenrce.

// UseRef => It return actually an object. It lets you store mutable (that can be changeable using current) values that survive re-renders, 
// WITHOUT causing re-render(i.e no re-render even i change the value of ref object like => refOne.current=20;)
const refOne = useRef(0)
// React returns object:
refOne:{
  current: 0
}

// You may ask like - it is also an object right, so on re-render ye bhi new object bnna chahiye right ? then useRef ka 
// importance hi khtm fit toh ?? ---->> see answer in hooks_vs_normalObject file.

//  ************************* USECASE -

// 1-) Accessing DOM Elements : MOST common beginner use case.
// Example
const inputRef = useRef()
function focusInput() {
  inputRef.current.focus()    // here accessing the DOM input element as input was refernce by useRef and accessed by .current
}
return (
  <>
    <input ref={inputRef} />
    <button onClick={focusInput}>
      Focus
    </button>
  </>
)
// Here: inputRef.current => becomes actual DOM node.

// ---------------- ***** 2-) Avoiding Stale Closures:  SUPER IMPORTANT production use case.
// Example
const countRef = useRef(count)
useEffect(() => {
  countRef.current = count
}, [count])

useEffect(() => {
  const id = setInterval(() => {
    console.log(countRef.current)  // setInterval ke saath ref object gya callback queue me, while printing wo ref
    // object ki value print krega, jo bhi uss time pr hogi while executing the setInterval function
  }, 1000)

  return () => clearInterval(id)
}, [])
// Why works? Because: ref object same rehta, and callback queue me ref object hi jaa rha hai saath me.
// Only: .current update hota, i.e object kje andr ki cheej
// So old callback: latest value read kar pata


// ---------------------- ***** 3-) Previous Value Tracking: VERY common interview question.
// example
function Counter() {
  const [count, setCount] = useState(0)

  const prevCountRef = useRef()

  useEffect(() => {
    prevCountRef.current = count
  }, [count])

  return (
    <div>
      <p>Current: {count}</p>
        <p>Previous: {prevCountRef.current}</p>  {/* this will always print the older value, becoz phle paint hoga UI then useEffect run hoga */}
      <button onClick={() => setCount(count + 1)}> + </button>
    </div>
  )
}
// 👉 “previous value” is visible during render window.
// Because: state updates → re-render → THEN effect runs
// So at render time: count = NEW value, prevCount = OLD value
// And when render complete and useEffect runs then only current value updated. So to see old value, usko print krdo UI performance, and 
// u can see it old value, becoz UI paint always happens before useEffect runs.


// Some extra useCase of useRef():
// ✅ Debouncing
// const timeoutRef = useRef()
// Store timeout IDs, and it can later be cleared by other function as well.
// But normal debouncing can also be done simple using setTimeout and clearing the interval, no need of useref.

// ✅ Infinite scroll
// Store observer instance.

// ✅ WebSockets
// Store socket connection.

// ✅ Prevent duplicate API calls
// const isFetching = useRef(false)
// ✅ Tracking mounted status
// const mountedRef = useRef(true)
// 
// 
// 
// 
// 
// 