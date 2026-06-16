
// -----------------------------------------------Sabse pehle: Pagination hota kya hai?
// Simple language me: Bade dataset ko chhote-chhote pages me todkar user ko dikhana.
// Example: Tumhare paas 10 lakh products hain.
// ❌ Aisa nahi karoge: GET /products
// Aur 10 lakh products ek hi baar bhej do.

// Instead:
// Page 1 → 20 products
// Page 2 → next 20 products
// Page 3 → next 20 products

// Yehi pagination hai.
// Example: Amazon pe search kiya: Showing 1–24 of 10,000 results

// ------------------------------------------------ Pagination ki zarurat kyun padti hai?
// 1. Performance
// Maan lo DB me: 10 lakh users, Agar sab ek baar me fetch kiye:
// Database slow
// API slow
// Browser hang
// Memory waste

// 2. Better UX
// User ko chahiye: 20 products dekhne hain, Usko 10 lakh products ek saath nahi chahiye.

// 3. Network Optimization
// 100 MB data bhejna: ❌ Waste
// 20 records bhejna: ✅ Efficient

// 4: Also useful in interview questions like, how you will load the heavy file size in FE or BE ? like 20MB json file
// Answer: We can use pagination to load the file in chunks, for example, we can load 1MB of data at a time, and then load the next 
// chunk when the user scrolls down or clicks on a button. This way, we can optimize the performance and user experience by not loading 
// the entire file at once.

// ------------------------------------------------- Types of Pagination
// 1. Offset Pagination (Most Common)
// 2. Cursor Pagination (Modern Approach)


// --------------------------------------------------- Pagination kaise hoti hai?
// 1.************  Offset Pagination (Most Common)
// Offset Pagination: DB se bolte ho: "40 records skip karo, phir 20 de do."
// OFFSET means = kitne records SKIP karne hain.

// example: Aur tum ek page pe 10 users dikhana chahte ho. so limit hogyi 10.
// and konsa page chahiye uske hisab se tumhe OFFSET calculate karna padega. 
// For example, agar page 1 chahiye to OFFSET = 0, page 2 chahiye to OFFSET = 10, page 3 chahiye to OFFSET = 20, and so on.

// But FE se only page and limit bhejna hota hai eg=> page = 3, limit = 3 (Becoz ye pgae update easily setState se ho jaata FE me) 
// aur backend me OFFSET calculate karna hota hai using formula: OFFSET = (page - 1) × limit

// Example:
const [page, setPage] = useState(1)
//  on every time button click, page number change hoga, and useEffect will run again to fetch new data for that page.
useEffect(() => {
  fetch(`/api/products?page=${page}&limit=20`)
}, [page])
//<button onClick={() => setPage(page + 1)}> Next </button>


// Backend Example (Express)
app.get("/products", async (req, res) => {
    // fetching page and limit from query parameters, with default values if not provided
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 20

  const skip = (page - 1) * limit
    // Using skip and limit to fetch the appropriate set of products from the database
  const products = await Product.find()
    .skip(skip)
    .limit(limit)

  res.json(products)
})

// Pros:
// Easy to implement
// Easy to understand

// Cons:
// Agar: Page = 100000
// DB ko pehle:999999 records skip karne padenge. Slow ho jata hai.

// ******************* 2. Cursor Pagination (Modern Approach)
// Cursor Pagination Idea is Instead of saying: "Mujhe page 50000 do"
// hum kehte hain:"Mujhe is particular record ke BAAD wale 20 records do."

// Suppose table:
// id	name
// 1	A
// 2	B
// 3	C
// 4	D
// 5	E
// 6	F

// Frontend: GET /users?cursor=2&limit=3
// Backend:
// SELECT *
// FROM users
// WHERE id > 2
// ORDER BY id
// LIMIT 3;

// Response:
// {
//   "data": [
//     { "id": 3, "name": "C" },
//     { "id": 4, "name": "D" }
//     { "id": 5, "name": "E" }
//   ],
//   "nextCursor": 5
// }

// Pros: Fast
// Scales well
// Infinite scrolling ke liye best

// Suppose user bole: Mujhe direct page 57 pe jaana hai.
// Cursor pagination me mushkil hai.
// Kyuki tumhare paas: cursor for page 56 hona chahiye.
// Isliye: Cursor Pagination Best For: ✅ Infinite scrolling
// Instagram
// Twitter
// LinkedIn feed
// Chat messages
// Notifications

// Real World Use Cases
// Amazon:Mostly offset pagination.
// Page 1
// Page 2
// Page 3

// Instagram: Cursor pagination.
// Load more...
// Load more...

// Twitter/X Feed: Cursor pagination.
// Infinite scrolling

// YouTube Comments: Cursor pagination.


// --------------------------------------------------------Senior Developer Perspective
// If records are: < 1000
// Offset pagination is usually fine.

// If records are: Lakhs / Millions
// Use:Cursor Pagination

// ---------------------------------------------------------- Pagination vs Infinite Scroll
// Pagination
// Page 1
// Page 2
// Page 3

// Best for:
// E-commerce
// Search results
// Admin dashboards


// Infinite Scroll
// Scroll ↓
// Load more
// Scroll ↓
// Load more

// Best for:
// Social media
// Feeds
// Content consumption apps


