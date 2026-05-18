
// Browser ke paas multiple ways hote hain data store karne ke.

// Storage	            Use
// 1-) localStorage	    Small persistent data
// 2-) sessionStorage	Temporary tab data
// 3-) Cookies	        Server communication
// 4-) IndexedDB	    Large structured data
// 5-) Cache API	    Offline assets

// Ye sab: browser-side storage hai.
// Matlab: client/browser me save hota
// NOT backend/database.

// ======================================================================================================================
// LOCALSTORAGE==========================================================================================================

// Browser me: persistent(always there, udd nhi jaata apne aap) key-value storage

// 1-) Data survive karta on: page refresh, browser restart, system restart. until manually removed.
// Incognito mode me: localStorage temporary hota hai, window close → delete

// 2-) Each website(origin) ka apna alg localStorage bnakr rkhta hai browser. It stores upto 5-10mb data per origin, hence 
// same website ka koi endpoint open in another tab then wo localStorage se sync kr lega data.

// 3-) Suppose, 1crore website, then itna data kaise browser rkhega hrr website ka ? Browser lazy loading karta hai
// Browser: ❌ sab websites ka storage memory me load nahi karta
// sirf currently used sites ka access karta hai, Baaki humare disk(localdisk or ssd) me pade rehte hain.

// 4-) No expiry limit generally, hence till manually cleared or removed, it persist forever in our disk.
// To delete localStorage data, either we can open inspect and application tab, then select and clearAll by right click
// or we can run - in console - localStorage.clear(), Ye current website ka pura localStorage uda dega.

// 5-) Sirf strings store hoti hain
// localStorage.setItem("user", "Ratnesh");
// Hence agr object ya anything else, then first convert to String, then only store it.
// localStorage.setItem("user", JSON.stringify(obj))

// 6-) Synchronous hota hai
// Blocking operation hai, hence Bahut huge data store/read karna performance and UI-lag hurt kar sakta hai. Becoz 
// main thread usko parse krne me lgg jaaega

// 7-) Easily accessible by JS code, hence sensitive data mt rkhna isme. (like auth token, passwords, secrets).
// XSS attack dangerous

// 8-) Data to be stored-
// a) Theme preference- dark mode, language, font size, Because: User next time aaye tab bhi same chahiye.
// b) Shopping cart: Agar user browser close karke bhi aaye toh cart bachna chahiye.
// c) Remember me settings like: sidebar collapsed,layout selected i.e Persistent UI preferences.


// ==========================================================================================================================
// SESSION-STORAGE ==========================================================================================================

// Similar to localStorage in access and setting things. Just iska lifetime alg hota hai.
// localStorage- "Ye data future me bhi chahiye", means if user comes again to same website, then data recover ho.
// sessionStorage - "Ye sirf current tab/session tak chahiye"

// 1-) Data survive karta on: per tab + per origin. (if either of them changed, mean if tab changed, bhle hi same origin ho, then no access)
// Tumne: youtube.com, 2 tabs me open kiya.
// Tab 1, sessionStorage.setItem("name", "Ratnesh")
// Tab 2, sessionStorage.getItem("name")
// Result: null
// Because sessionStorage per-tab isolated hota hai.
// Same tab me refresh ya re-load me data persist.
// Tab closed, ya tab changed (even same origin ho), then no access to same sessionStorage, unka alg sessionStorage bnega.

// 2-) Each website(origin) ka apna alg sessionStorage bnakr rkhta hai browser. It stores upto 5-10mb data per origin.
// same storage limit as localStorage.

// 3-) To delete sessionStorage data, either we can open inspect and application tab, then select and clearAll by right click
// or we can run - in console - sessionStorage.clear(). [Same as localStorage]

// 4-) Sirf strings store hoti hain. [Same as localStorage]
// sessionStorage.setItem("user", "Ratnesh");
// Hence agr object ya anything else, then first convert to String, then only store it.
// sessionStorage.setItem("user", JSON.stringify(obj))

// 5-) Synchronous hota hai, same as LocalStorage
// Blocking operation hai, hence Bahut huge data store/read karna performance and UI-lag hurt kar sakta hai. Becoz 
// main thread usko parse krne me lgg jaaega

// 6-) Easily accessible by JS code, hence sensitive data mt rkhna isme. (like auth token, passwords, secrets).
// XSS attack dangerous. [Same as localStorage]

// 7-) UseCases -
// a) Multi-step form
// Example:
// Step 1 → personal info
// Step 2 → address
// Step 3 → payment
// User refresh kare toh data na ude, becoz aage user se aur data lena hai same form ka. But tab close pe remove ho jaye.
// Perfect for sessionStorage.

// b) Checkout form
// Payment chal rha hai. Refresh pe data bachna chahiye.
// But tab close pe cleanup ho jaye.


// ======================================================================================================================
// COOKIES ==============================================================================================================


// In this you will see auth-cookie role and ten accept cookies Ads role at last.

// Cookies browser ka purana aur bahut important storage mechanism hai.
// Originally cookies banayi gayi thi becoz :
// "HTTP stateless hai, toh user ko remember kaise kare?" : Because HTTP request by default kuch yaad nahi rakhta.
// Simple definition: Cookie = browser me stored small data jo: browser save karta hai and har request ke sath server ko bhej sakta hai

// 1-) Cookies ka MAIN use: Authentication, Sabse important use hai.
// Example that we mainly store in it:
// session id
// auth token
// login state

// 2-) Every Domain ka cookies bnta hai 
// It is shared accross tabs :
// Same website ke: multiple tabs, refresh, reopen --> me shared hoti hain.
// Just think ki, tum login ho, toh kb kaise kha tk login rhoge. 
// Example: Tum login karte ho: amazon.in
// Server cookie set karta hai: Set-Cookie: sessionId=abc123
// Ab: Tab 1, Tab 2, Tab 3    ->> sab me same cookie available hogi.
// Isi liye: 🔥 ek tab me login → dusre tab me bhi logged in.


// 3-) Cookie ka structure: Cookie sirf key-value nahi hoti. Metadata bhi hota hai.
// Also yha expiry set hoti, till this time, it can be accessed by same origin in all tabs automatically.
// Example: These all extra things in key:value format
// Set-Cookie: token=abc;
// Expires=Wed, 21 Oct 2026 07:28:00 GMT; --> Expiry nahi di. → browser close pe delete.
// Secure; ---> Cookie sirf HTTPS pe jayegi. not on http.
// HttpOnly;  --> ❌ JS access nahi kar sakta, auto send in header of every request
// SameSite=Lax/strict/none  --> CSRF attacks reduce karta hai.

// 4-) Cookies delete kaise kre ?
// Although after expiry browser isko hta deta hai, but for manual, you can check application tab, select and clear it all

// Path-based sharing bhi hoti hai
// Example: Set-Cookie: x=1; Path=/admin
// Then cookie sirf: /admin/*, routes pe jayegi. for more security.

// 5-) Two ways of storing authentication :
// Session cookies vs JWT confusion 😄
// Modern apps often: use still Old way: using Session ID in cookie and Server DB maintain karta hai and check with session id.
// Modern way: JWT token, stored in HttpOnly Secure Cookie, then directly verify in BE services.

// 6-) JS can access cookies easily (not the httpOnly marked cookies, but the normal ones)
// JS se cookie access: Set cookie: document.cookie = "theme=dark"
// Read: document.cookie
// Output: theme=dark; token=abc

// 7-) Cookies synchronous hoti hain? 
// YES 😄, document.cookie synchronous API hai. Isliye huge usage inefficient hai.

// 8-) Kitni cookies allowed?
// Browser limits: ~20-50 per domain, browser dependent
// Cookie size limit: Bahut choti, Usually: ~4KB per cookie

//  Accept cookies in websites means ?? ---->> see next file for more understanding.