// =====================================================================================
// First understand => 1st-party vs 3rd-party tracking/cookies

// ----------------------- 1st-party tracking/cookies:
// Tum amazon.in pe ho.
// Amazon hi tracking kr rha, Amazon hi cookie set kr rha, and data Amazon ke own backend/server pr jaa rha.

// Amazon ko pata hota:
// - kya search kiya
// - kya dekha
// - kya cart me dala
// - kya buy kiya

// Fir Amazon: personalize karta hai.
// - homepage
// - recommendations
// - emails
// - ads

// NOTE:
// Actual recommendation/profile mostly backend DB me hoti.
// Cookie usually sirf:
// - sessionId
// - userId
// - preference ids
// jaise identifiers store krti hai.
// and iss ID ke help se, BE se load hoti hai recommendations ki data and then wo FE pr show hoti hai


// -------------------------- 3rd-party tracking/cookies
// Tum newswebsite.com pe ho.
// But usme Google/Meta ads ya analytics scripts lagi hain, FE ke code me.
// Example: <script src="google-ads.js"></script>

// Ab Google ka JS run hoga, newswebsite.com website open krte hi
// Wo user actions track kr skta:
// - page viewed
// - clicks
// - time spent

// Ye data Google ke backend/server pr jaata. Fir Google internally profile bana skta:
// Example:
// User123:
// - gaming
// - laptops
// - tech

// Fir jab tum dusri website open kro, jisme bhi Google Ads lage ho, toh Google personalized ads dikha skta.
// 3rd-party tracking me: ad company apna khud ka persistent tracking ID maintain karti hai cookies me, jisse wo user ko identify kre.
// ex- _gads, _gpi, _gid etc. in cookies for google ads. amazonUserId=555 etc somthing like this.

// Same website pe: multiple companies ki cookies ho sakti.
// Example:
// Domain	        Cookies
// website.com	    first-party
// google.com	    tracking
// doubleclick.net	ads
// facebook.com	    Meta tracking

// =====================================================================================
// Now ===>>> Accept Cookies popup ka REAL meaning ???
// ========================================

// Mostly iska meaning hota, wesbite khti:  
// "Kya hum analytics/tracking/personalization/ads ke liye cookies & trackers use kar sakte?"
// IMPORTANT: Ye popup mainly non-essential tracking ke liye hota.

// Essential cookies mostly bina consent ke allowed hoti hai, for website functionality:
// - login session
// - cart
// - security
// - csrf token
//  Also 1st party cookies bhi auto chlti hai, uske liye consent ka jrurat nhi.


// Non-essential cookies/tracking
// a) Analytics: User behavior understand karna => userId=123, trackingId=abc123, sessionId=xyz789
// b) Advertising: Personalized ads => adUserId=123, adTrackingId=xyz
// c) Tracking: Cross-site user profiling  => trackingId=abc
// Ye analytics, advertising and tracking ki real data BE me hoti, yha cookies me sirf ID store hoti, 
// uske basis pr BE me profile bni rhti hai user ki. (backend databases + ML systems)
// d) Personalization: User preferences remember karna => theme=dark, language=en, fontSize=large



// ====================================== If user ACCEPTS cookies:

// Website:
// - analytics scripts load kr skti
// - ads trackers load kr skti
// - personalization systems enable kr skti
// - 3rd party tracking sb chlegi, becoz user said ki yes aap personalization kro mere data ka.
// Consent mainly: non-essential, analytics, ads, cross-site tracking => ke liye important hota.
// Accept ka matlab: "Website additional tracking/personalization systems, enable kar sakti hai."

// Example:
// Google Analytics
// Meta Pixel
// Ad trackers


// ======================================= If user REJECTS cookies
// Personalized tracking reduce ho skti.
// Generic ads aa skte. (Not personalised ones)
// Website fir bhi mostly kaam karegi, and ads dikha skti general.

// ========================================
// Example flow:

// Tum gaming laptop search krte ho.
// Google/Meta/Amazon system infer karta:
// "User interested in gaming"

// Fir:
// - ads personalize ho skte
// - recommendations personalize ho skte
// - homepage personalize ho skta

// depending on:
// - 1st-party systems
// - 3rd-party systems