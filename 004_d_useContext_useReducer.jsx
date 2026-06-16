
// =====================================USE CONTEXT======================================================
// ======================================================================================================

// 🧠 Why useContext came?
// Because React apps me problem hoti thi: Prop Drilling
// Example: App -> Layout -> Sidebar -> Profile -> Avatar component

// Suppose: user data, sirf Avatar component ko chaiye.
// ❌ Without Context
// <App user={user} />
// <Layout user={user} />
// <Sidebar user={user} />
// <Profile user={user} />
// <Avatar user={user} />
// Problem? Intermediate components: unnecessary props pass kar rhe, even if they don’t use it.
// This is: prop drilling
// ⚛️ Solution → Context API i.e React introduced: global-ish shared data mechanism



// ⚛️ ----------------------------->>> Basic Flow of writing and using useContext
// 1️-) Create context: const UserContext = createContext()
// 2️-) Provide value, by wrapping the whole app
// const[user,setUser]=useState({name:"Ratnesh"})
// <UserContext.Provider value={user,setUser}>
//     <App />
// </UserContext.Provider>
// 3️-) consume anywhere: const user = useContext(UserContext)




// ⚛️ ------------------------->>>> Deep Internal Understanding and Note Points
// As consumers are consuming the values, hence if values changes then re-render hoga.
// Basic Principle: Also values for providers, inko useState variable ya fir useMemo(for object and arrays) se hi 
// bnaye then assign to provider. And change using spread operators for changing values of non-primitives.

// ❌ Case:1: On context value change
// Although yha props se nhi jaa rha, but as context import ho rha(but re-render happens on state and context changes.)
// React internally tracks: which components consume which context
// When provider's any value changes: React schedules updates for all consumers, context updates can rerender large tree
// When provider value changes: <UserContext.Provider value={something}>
// React checks: oldValue !== newValue ?
// If: reference changed, then React says: "All consumers must update", becoz they are importing these contexts
// Although yha props se nhi jaa rha, but as context import ho rha(but re-render happens on state and context changes.)
// Shallow compares: For primitive value react check it value, for object/array/function react checks refercnce

// ❌ Case:2: On having object directly as the context value
// Rerender happens if: provider value is object and it reference changes
// Example Problem:
{/* <ThemeContext.Provider value={{
  theme,
  toggleTheme
}}>
-----> New object refernce created every render, so agr jha themeProvider defined hai, if that re-render, then the object
defined inside value of provider also changed. So: all consumers rerender.
✅ Fix, using useMemo(as it memoize the object value and dont create the new object on every re-render)
const value = useMemo(() => ({
  theme,
  toggleTheme
}), [theme]) */}


// Or use like this ----------------------------- Object normal vs Object in UseState:
// CASE a) — Object directly render me create karna
//   const user = {
//     name: "ratnesh"
//   }
// Every render:new object created. because component function reruns. So: oldUser !== newUser
// Consequence: If: Child wrapped in React.memo, still: child rerender because prop reference changed.
// ✅ Here useMemo use krna hota hai hume to bind this object.


// CASE b) — Object inside useState
// const [user, setUser] = useState({
//   name: "ratnesh"
// })
// Now: React stores object internally, NOT recreated on every render.
// Meaning: Even if component rerenders: same object reference reused, until: setUser called
// So:✅ NO need of useMemo here normally. Because: useState already preserves reference
// When update happens using spread operator.
// setUser(prev => ({
//   ...prev,
//   age: 24
// }))
// Now: new object reference created intentionally, because state changed. And:rerender should happen



// ❌ CASE:3: Using Single AppContext
// i.e single context for everything, so any change in that context, so most of consumer will re-render.
// BETTER: Separate context for different usecase
// ThemeContext
// AuthContext
// CartContext
// Because: updates isolated ho jaate
// Example: 🔥 HUGE optimization. (as it was done in lloyds project)
<UserContext.Provider value={user}>
  <ThemeContext.Provider value={theme}>
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  </ThemeContext.Provider>
</UserContext.Provider>
// Hence If:theme changes, ONLY: ThemeContext consumers rerender, NOT: user consumers, cart consumers


// ❌ Case:4: If parent re-render then all consumer may re-render
// Agar parent/provider component rerender hua, toh: andar ke saare Provider components(those defined here in parent) bhi rerender honge
// BUTTTTTTTTT, ❌ iska matlab ye nahi: all consumers(those using these providers values) rerender honge
// Yahi MOST IMPORTANT distinction hai.

// ⚛️ Samjho carefully Example:
function Providers({ children }) {      // this whole file will re-render when any useState value of provider updates.
  const [user, setUser] = useState()
  const [theme, setTheme] = useState()
  const [cart, setCart] = useState()
  return (
    <UserContext.Provider value={user, setUser}>
      <ThemeContext.Provider value={theme, setTheme}>
        <CartContext.Provider value={cart, setCart}>
          {children}
        </CartContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  )
}
// Now suppose: user changed, due to some component that were using this context, they ran setUser function to update user.
// What happens internally?
// 1️⃣ Providers component rerenders(i.e these all lines of parent component(Provider) recreate honge) 
// Because: setUser triggered rerender
// 2️⃣ All JSX of this parent recreated, Meaning: all Provider elements recreated
// BUT IMPORTANT 🔥:  React now compares: UserContext value: oldUser !== newUser,✅ changed.
// So: UserContext ke sabhi consumers rerender(those were using this userContext)
// But ThemeContext value, oldTheme === newTheme, ✅ same reference.
// So: ThemeContext ke sbhi consumers DO NOT rerender from context update
// Same for cartContext.

// So just a small note: agr values of provider update hogi, toh parent re-render hoga, but consumers ke liye refernce check hoga.



// ----------------------------->>>>>  Common Use Cases
// ✅ Theme: dark/light mode
// ✅ Auth/User: logged-in user
// ✅ Language/Locale: i18n
// ✅ App Config: global config/settings
// ✅ Small shared state

// ❌ Bad use cases: Huge frequently changing app state.
// Why?, Because: context updates can rerender large tree
// Using context for these: can hurt performance badly
// Example BAD Case
// chat messages
// realtime data
// huge dashboards
// rapid updates



// =====================================USE REDUCER============================================================
// ============================================================================================================

