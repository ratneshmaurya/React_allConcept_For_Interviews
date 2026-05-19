// React useState value kab reset hoti hai?, you will learn it in few minutes

// Remember => React state: component instance ke saath tied hoti hai

// Jab component: destroy/unmount hota hai, ya new instance banta hai tab state reset ho sakti hai.


// ---------------------------- State HOLD rehti hai when:
// Normal re-render
setCount(count + 1)
// 👉 component re-render hoga
// 👉 BUT state preserve rahegi, means state ki value reset nhi hogi, jo changes hua usko lekr it will continue.

// Parent re-render
// Parent render hua?
// Child ki state: still preserved
// unless child unmount hua.

// ---------------------------- State RESET hoti hai when:
// ----------1️⃣ Page refresh: FULL reset

// Because:
// poora JS app restart
// memory clear
// React app reinitialize

// So: useState(0), again initial value se start.

// Example
const [count, setCount] = useState(0)
// Refresh ke baad:
count = 0

// **** Important concept
// useState is MEMORY-BASED
// State lives in:  RAM (browser memory during runtime)
// So:
// refresh ❌ → memory wipe → state gone
// tab close ❌ → state gone
// crash ❌ → state gone


// ----------2️⃣ Component unmount + remount

// Example:
{show && <Counter />}
// if show=false  ==> Counter removed/unmounted.
//  i.e State destroyed ❌

// if show=true again, then NEW Counter instance banega
// State reset to initial value.

// ----------3️⃣ Route/page change (sometimes)

// Example React Router
// <Route path="/home" element={<Home />} />
// <Route path="/about" element={<About />} />
// if moved from Home → About

// Home component unmount, thus Its state destroyed.
// now if Back to Home, NEW Home component created. State reset hogya.

// --------------- BUT sometimes layout persists

// Example:
<AppLayout>
   <Routes />
</AppLayout>

// AppLayout stays mounted, So its state persists.

// 💣 ----------------------- VERY IMPORTANT
// React state: memory me hoti hai

// NOT:
// localStorage
// database
// backend

// So on doing refresh: memory wipe