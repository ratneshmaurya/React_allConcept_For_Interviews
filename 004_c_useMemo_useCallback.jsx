
// React compares dependencies using: Object.is(). Mostly reference comparison. so agr 
// primitve value hai, then changing values directly are okay as they create new refenece, but if agr 
// object/array hai then must change using spread operator to have new object refenrce.
// For comparison :
// for primitve -> value compares
// For object/array/fucntions --> reference comapres


// =====================================USE MEMO======================================================
// ===================================================================================================

// useMemo uses dependency refernce comparison. (Shallow comparison krta, not deep(values))
// Same as useEffect: Object.is
// So: for primitve -> value compares
// For object/array/fucntions --> reference comapres


// Dont use it for lamen calculation and primitive values. useMemo itself has cost and memory.
// As React: store cache, compare dependencies, manage memory. So: memoization is NOT free
// i.e react internally comapres with the earlier old cached dependecy value. This comparison is memoization cost.
// If memoization cost is more than the function calculation cost(basic add function hua ya primitive value hui), then useMemo is waste.

// 🚨 HUGE beginner mistake : for no reason 😭
// const data = useMemo(() => {
//   return { name: "ratnesh" }
// }, [])


// useMemo: does NOT prevent re-render
// VERY IMPORTANT.People misunderstand this.
// It ONLY: reuses cached value
// ⚛️ Then why useful? Because sometimes: calculation expensive hoti
// Examples:

// filtering huge arrays
// sorting
// charts
// parsing
// markdown conversion
// heavy transforms

// USECASE:
// 1-) To memoize expensive calculations


// 2-) Stable object references: VERY IMPORTANT production use.
// Why? Because: objects recreate every render, So Without useMemo, same object before render and after render are not equal

// So: for these 2 cases, it will create issue:
// a-) Parent child props case: React.memo also not work and children rerender hoga, becoz object ref are different
// Example:
// Child Component
const Child = React.memo(({ data }) => {
  console.log("child render")
})

// Parent, having an object that it will pass into props of child
const data = {
  name: "ratnesh"
}

// Every render: new object reference
// So: React.memo fails.
// Fix, in parent container memoize the object
const data = useMemo(() => ({
  name: "ratnesh"
}), [])
// Now: stable reference, React.memo works.


// b-) Useeffect case having object in dependecy array: useEffect retriggers, becoz referrence change hoga
// Hence always wrap the object in useMemo beccoz: useMemo stabilizes reference.

// ⚛️ ************** But if using object inside useState then no need of useMemo():
    const [user, setUser] = useState({
    name: "ratnesh"
    })
// Now: React stores object internally, NOT recreated on every render.
// Meaning: Even if component rerenders: same object reference reused, until: setUser called
// So:✅ NO need of useMemo here normally. Because: useState already preserves reference
// When update happens using spread operator.
// setUser(prev => ({
//   ...prev,
//   age: 24
// }))
// Now: new object reference created intentionally, because state changed. And:rerender should happen





// =====================================USE CALLBACK======================================================
// =======================================================================================================

//🔥 VERY IMPORTANT : useCallback: does NOT stop function creation. People misunderstand this.
// Actually: React still creates new function internally.
// But: React returns cached old reference, if dependencies same.


// USECASE:
// 1️⃣ Passing function to React.memo child: MOST IMPORTANT use case.
// Remember one thing - Without this React.Memo()--> this useMemo and useCallback ka child render pr koi kaam nhi aaega 
// as these both hooks preserve reference, but comparison of refernce is done by react.memo, without react.memo child
// will always re-render, bhle hi we will use useMmemo or pass same reference things in props, doesnot matter

// 2️⃣ Stable function dependencies in hooks
// Example
useEffect(() => {
  fetchData()
}, [fetchData])

// Without useCallback: fetchData recreated every render
// Effect reruns infinitely maybe.
// Fix
const fetchData = useCallback(() => {
  console.log("fetch")
}, [])





// ============================= IMPORTANT===================================================================

// CASE:1: ⚛️ IMPORTANT: React.Memo with useMemo and useCallback hooks
// useMemo() and useCallback() mainly preserve references.
// BUT reference preservation tabhi useful hota hai, jab koi cheej ya library -> component/reference comparison kar raha ho.
//
// React.memo() child components shallow comparison karte hain props ka.
// Isi wajah se stable references useful bante hain.
//
// Without React.memo():
// Child component normally parent ke har re-render par re-render hoga,
// chahe props same reference ke ho ya memoized ho.
//
// So:
// useMemo/useCallback ALONE usually child re-render nahi rok sakte.
// They become effective mainly when paired with:
// - React.memo
// - dependency comparison
// - referential equality checks
//
// Example:
// Parent re-render
// ↓
// Child wrapped in React.memo?
//   YES → prop references compare honge
//          stable refs => child skip render possible
//
//   NO  → child render anyway




// CASE:2: ⚛️ IMPORTANT: Stale Closure with Empty Dependecies in React, everywhere.

// Stale closure happens when a callback/function executes LATER (async work like setTimeout, setInterval, promises, listeners, etc.)
// and still holds old variables from the render in which it was created.

// In React, this problem becomes very noticeable around hooks that use dependency arrays:
// - useEffect, - useMemo, - useCallback
// Becoz if empty dependencies, React reuses old closures/functions created from older renders, which may contain stale state or props.

// One common solution is: adding proper dependencies,
// so React recreates the hook callback/value/function on every render with fresh render values.

// ********* But dependency arrays are NOT the only solution.
// Sometimes we do NOT want the hook/callback to rerun or recreate, I mean we dont want that hook runs again, or it runs only once
// In such cases, we use:
// - functional updates
// - useRef

// Functional update:setCount(prev => prev + 1), This avoids stale state because React provides latest state internally.
// useRef solution:refs hold mutable latest values without needing rerenders or hook recreation.
// So overall:
// Dependency arrays → recreate closure with latest values
// Functional updates → get latest state safely from React
// useRef → manually access latest mutable value without rerunning hooks


// 
// 
// 
// 
// 