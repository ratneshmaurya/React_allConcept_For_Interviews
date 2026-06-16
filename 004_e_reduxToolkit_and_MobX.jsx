// Redux Toolkit Core Flow 

// Redux Toolkit me tum mostly ye 5 cheezein use karoge: 
// configureStore 
// ↓ 
// createSlice 
// ↓ 
// actions 
// ↓ 
// useDispatch 
// ↓ 
// useSelector

// Flow: 
// User Action 
// ↓ 
// dispatch(action) 
// ↓ 
// Slice Reducer 
// ↓ 
// Store Update 
// ↓ 
// useSelector 
// ↓ 
// React Re-render 

// ------------------------------------------------------------
// Example: Counter App 
// Hum ek simple counter se start karte hain. 

// ===============Step 1: createSlice 
// Ye Redux Toolkit ka sabse important function hai. 

// Pehle Redux me ye sab alag files hoti thi: 
// actions.js 
// reducers.js 
// constants.js 

// Redux Toolkit me: 
import { createSlice } from "@reduxjs/toolkit"; 
const counterSlice = createSlice({ 
    name: "counter", 
    initialState: { 
        value: 0 
    }, 
    reducers: { 
        increment(state) { 
            state.value++; 
        }, 
        decrement(state) { 
            state.value--; 
        }, 
        incrementByAmount(state, action) { 
            state.value += action.payload; 
        } 
    } 
}); 
export default counterSlice.reducer; 
// exporting becoz it will be used in configuring store. SO if agr 
// multiple Slices hue, then kaam aata ye pattern. 

export const { 
    increment, 
    decrement, 
    incrementByAmount 
} = counterSlice.actions; 

// createSlice kya karta hai? 
// Ye automatically banata hai: 
// Reducer : counterSlice.reducer 
// Action Creators : increment(),decrement(),incrementByAmount(10) 

 

// ===================== Step 2: configureStore 
// Store create karna.  
import { configureStore } from "@reduxjs/toolkit"; 
import counterReducer from "./counterSlice"; 
export const store = configureStore({ 
    reducer: { 
        counter: counterReducer 
    } 
}); 


// Agr multiple reducers hue then Har slice apna reducer export karega and store aese bnega: 
// reducer: { 
// auth: authReducer, 
// products: productsReducer, 
// cart: cartReducer 
// } 

 

// =================== Step 3: Provider 
// Redux store React ko provide karna. 
import { Provider } from "react-redux"; 
<Provider store={store}> 
    <App /> 
</Provider> 
// Provider kya karta hai? 
// Store ko React Context ke through saare components tak pahucha deta hai. 

 

// ====================== Step 4: useSelector 
// Store se data lena. useSelector ka kaam yhi hai. 
import { useSelector } from "react-redux"; 
const count = useSelector( 
    state => state.counter.value 
); 

 
// For multiple reducers, we write useSelector like this based on reducer name. 
// const user = useSelector( 
//     state => state.auth.user   (user is the value defined inside initialState) 
// ); 
// const cart = useSelector( 
//     state => state.cart.items   (items is the value defined inside initialState) 
// ); 

 

// Important 
// Component re-render kab hoga? 
// Sirf tab jab: Selector ka returned value change ho. 

// Example:Count change hua? 
// ✅ Re-render. 
// Agar: 
// const theme = useSelector( 
//     state => state.theme.mode 
// ); 
// Count change hua? ❌ Theme component re-render nahi karega. Becoz theme nhi 
// change hua, count hua hai. 

 

// =================== Step 5: useDispatch 
// Action bhejna. 
import { useDispatch } from "react-redux"; 
const dispatch = useDispatch(); 
Increment:  dispatch(increment()); 

// Payload ke saath:  dispatch(incrementByAmount(5)); 
// Internally: 
// dispatch(incrementByAmount(5)) 
// ↓ 
// { 
//     type: "counter/incrementByAmount", 
//     payload: 5 
// }
// ↓ 
// Reducer 
// ↓ 
// Store Update 
// ↓ 
// useSelector detects change 
// ↓ 
// UI re-render 

 
// Payload kya hota hai? 
// Additional data. 
// Example: 
// dispatch( 
//     incrementByAmount(20) 
// ); 

// Reducer: 
// incrementByAmount(state, action) { 
//     state.value += action.payload; 
// } 
// Result: 
// 0 → 20 

 

// ============================ Why useSelector instead of store.getState()? 
// Wrong: store.getState(); 
// React ko nahi pata state change hui. 

// Correct: useSelector(...) : Ye automatically subscribe karta hai. 
// Internally:Component Mount 
// ↓ 
// useSelector subscribes to store 
// ↓ 
// Store updates 
// ↓ 
// Selector runs 
// ↓ 
// Value changed? 
// ↓ 
// YES → Re-render 
// NO → Skip 



// --------------------------------------------Mobx and Redux Toolkit -------------------------------------------------- 
 
// Sabse bada difference Mobx and Redux Toolkit 
// Redux Toolkit: 
// State change karne ke liye 
// ACTION bhejna padta hai. 

// MobX: 
// State ko directly update kar do. 
// MobX automatically track kar lega. 

 

// MobX 
// Step 1: Observable, Class component method 
// Store 
import { makeAutoObservable } from "mobx"; 
class CounterStore { 
    count = 0;
    constructor() {
        makeAutoObservable(this); 
    } 
    increment() { 
        this.count++; 
    } 
    decrement() { 
        this.count--; 
    } 
    incrementByAmount(amount) { 
        this.count += amount; 
    } 
} 

export default new CounterStore(); 

// Observable ka matlab: "MobX, is value pe nazar rakhna. Agar ye change ho to mujhe bata dena. 
// Ab MobX internally sochta hai: count = 0, Koi count use karega? Main dekhunga. 


// 
// Step 2: observer 
// Observer ka matlab: "Ye component kis observable ko use kar raha hai, wo track karo." 
// Inside Component 

import { observer } from "mobx-react-lite"; 
import counterStore from "./counterStore"; 
const Counter = observer(() => { 
    return ( 
        <> 
            <h1>{counterStore.count}</h1> 
            <button 
                onClick={() => counterStore.increment()} 
            > 
                + 
            </button> 
            <button 
                onClick={() => counterStore.incrementByAmount(5)} 
            > 
                +5 
            </button> 
        </> 
    ); 
}); 
export default Counter 


// -------------- Flow: 
// Button Click 
// ↓ 
// counterStore.increment();
// ↓ 
// this.count++ 
// ↓ 
// MobX detects observable changed 
// ↓ 
// observer component re-renders 




// ----------------- Method 2: Direct Property Update 

// MobX technically allow karta hai: 

counterStore.count++; 
// ya 
counterStore.count = 100; 

// Example: 
<button 
    onClick={() => { 
        counterStore.count = 10; 
    }} 
> 
    Set to 10 
</button> 

// But production me ye recommend nahi hota. And hence drawback hai ye MobX ka: 
// Kyun? Ye: counterStore.count = 10; 
// se tumhe pata nahi chalega kis business logic ki wajah se update hua. 
// Isliye generally: counterStore.setCount(10); prefer karte hain. 
 

 