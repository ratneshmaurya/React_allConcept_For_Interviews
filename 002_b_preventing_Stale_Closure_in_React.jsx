

// Stale closure avoid karne ke liye:
// WE Need: latest value access somehow
// Ways to achieve latest values:
// 1-) dependency array in useEffect ==> recreate callback
// 2-) useRef	to that variable ===> mutable latest value
// 3-) functional update ==> React latest state deta


// ------------------------------------ ✅ METHOD 1 — Dependency array
// MOST common.
// If callback should recreate(new bne) on state value change: 👉 dependency array use kro.

// Example
useEffect(() => {
  const id = setInterval(() => {
    console.log(count)
  }, 1000)

  return () => clearInterval(id) // must needed to remove the earlier wala interval
}, [count]) // dependency array, so that useEffect firse new crete kre interval ko for new count value

// Why works?, Because:
// new count
// new effect
// new callback
// latest closure

// But downside 😵
// Every count change: interval recreate hota
// Sometimes expensive/unwanted.

// --------------------------------------- ✅ METHOD 2 — useRef (BEST for latest values)
// MOST important real-world solution.
// latest state continuously chahiye ho baar baar in asyn callback queue ke function me(setInterval etc):  👉 useRef often best.

// Example
const [count, setCount] = useState(0)
const countRef = useRef(count)

// remember to update the current value of useRef, so that latest value mile useRef me when needed and changed by rendering.
useEffect(() => {
  countRef.current = count
}, [count])

// now even if callback queue me chla jaaye console function, it will have the latest value.
useEffect(() => {
  const id = setInterval(() => {
    console.log(countRef.current) // now it reads latest value even after it runs anytime or manytime in future.
  }, 5000)

  return () => clearInterval(id)
}, [])

// Why works? Because: ref object same rehta
// Only: .current update hota
// So callback always latest value read karta.

// 🔥 THIS is very common in:
// intervals
// sockets
// event listeners
// subscriptions



// --------------------------------------- ✅ METHOD 3 — Functional state update
// VERY IMPORTANT. (use of prev and arrow)
// If updating state from previous state : 👉 functional update use kro.

// ❌ Bad way of updating
setCount(count + 1)
// might use stale count.

// ✅ Better
setCount(prev => prev + 1)
// Why?, React gives: latest state automatically

// Example
setInterval(() => {
  setCount(prev => prev + 1)
}, 1000)

// NO stale closure issue now.
// Because: prev always latest state hota ( can use any keywords, just use pattern like this only.)

// Isliye ye async situations me safe hota hai
// 3 sec baad bhi React latest state dega.
// Chahe beech me:
// 1 click hua ho
// 10 clicks hue ho
// batching hui ho
// re-render hua ho
// still correct latest value milegi.

//  for more deep analysis on functional update, check useState file


// ---------------------------- 🎯FINAL CONCLUSION 🎯 -----------------------------------
// If async callback needs: 
// 1-) latest state continuously :  👉 useRef often best.
// 2-) If callback should recreate(new bne) on state value change: 👉 dependency array use kro.
// 3-) If updating state from previous state : 👉 functional update use kro.


//  Basically just remember ki, agr callback queue me gya wo function, toh phle ki values lekr gya hoga
//  so usko updated vaLUES KAISE DE HUM? 
// useRef ??, Functional Update ? ya fir new callback bne with new value using dependency array
// 
// 
// 
// 
// 
// 
// 