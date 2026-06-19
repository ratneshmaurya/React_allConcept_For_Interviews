
// IN this I am covering some JS and as well as React Concept. Very Important

// JS******************************************************************
// Have many types of events- click, scroll, onkeypress etc
// We avoid writing events directly in elements tags as attribute fucntions, becoz that is not scalable in normal way
// but we write directly in React.js(or frameworks) becoz React handles it effeciently --> eg- <p onClick=(function name)/>

// Ok then, why not writing like this ??---> becoz by this, onclick() function gives less features, thus we use eventListeners
document.getElementById('owl').onclick = function () { //will also work, no issue
  alert("owl clicked")
}


// ********* IMPORTANT for Event Listener Activation----->>
// If suppose click event is fired on whole parent(div containing 4-5 other tags like <p> or <img>), and we click the child (i.e <p>)
// in the browser, then event.target will give only the child tag (as it gives only which tag is specifically touched)
// but remember if somehow the side lines of parent container is touched then event will work for that parent(i.e on all its child, not on a specific child)



//************* Event object(e) has so many things, functions, prototypes etc, useful for projects and interviews---> some below are
// type, timestamp, defaultPrevented
// target, toElement, srcElement, currentTarget,
// clientX, clientY, screenX, screenY --> for mouse positions when clicked
// altkey, ctrlkey, shiftkey, keyCode ---> to check which key pressed, useful for project like "Typing speed, Spell checker"

// TRELLO CLONE uses the Drag and Drop events(unique project hoga)

const bodyElement = document.querySelector("body");
bodyElement.addEventListener('click', function (e) {
  console.log(e); //returns the whole type of event that is being performed
  console.log(e.target); //returns the element which gets targeted on clicking (means which element is cicked)
})




// ************ Event Bubbling(move up like bubble) vs Event Capturing------------>

// Jab koi event trigger hota hai:
// <div>
//   <button>Click</button>
// </div>

// Aur button click kiya, to event sirf button pe nahi rehta. Wo pure document tree me travel karta hai.
// Is process ko: Event Propagation kehte hain. Iske 3 phases hote hain: and it traverse like this only.

// Capturing Phase
// ↓
// Target Phase
// ↓
// Bubbling Phase


// Phase:1️⃣ Capturing: Event upar se niche aata hai:
// document
// ↓
// html
// ↓
// body
// ↓
// parent
// ↓
// button

// Phase:2️⃣ Target: Button reached.:button clicked

// Phase:3️⃣ Bubbling: Ab event wapas niche se upar:
// button
// ↓
// parent
// ↓
// body
// ↓
// html
// ↓
// document

// ******************************
// You can prevent both event bubbling and event capturing by using event.stopPropagation()
// Easy rule: stopPropagation jis point pe execute hua:Uske aage ka propagation ruk jayega

// Capture phase me stop kiya: Target tak nahi gaya
// Document
// ↓
// Parent
// ❌ STOP only work when parent me, onClickCapture() function ho, tbhi react ko pta chlega ki iss onClick ko capture
// phase me hi chalana hai

// Target pe stop kiya: ❌ Bubble back nahi hoga
// Document
// ↓
// Parent
// ↓
// Button   -->> agr yhi pr event.stopPropogation lga diya then after executing target button onCLick(), ab bubbling nhi hogi


// Bubble phase me stop kiya: Document tak nahi jayega
// Button
// ↑
// Parent
// ❌ STOP, ye case simple hai, mtlb normal onCLick() hai parent me, toh wo bubbling ke time hi execute hoga.


// In Javascript:
// Third parameter of eventListener() decide whether to do Event bubbling or Event capturing in Javascript.
// if 3rd parameter is "false"(be default false value is there), then "Event-Bubbling" happens
// if 3rd parameter is "true", then it will run automatically in "Event-Capturing" phase. Or directly by user click(Target bnn jaaye)

// Important RULE : ********************************************
// 1: if Eventlistener(,,true) in JS OR onClickCapture() function in react: Then wo function
// Target hone par bhi chalega
// +
// Capturing phase me ancestor hone par bhi automatic chalega

// If Eventlistener(,,false) in JS or onClick() function in react : Then wo function
// Target hone par bhi chalega
// +
// Bubbling phase me ancestor hone par bhi automatic chalega
// *************************************************************

// Explaining case of bubbling phase-->> The event then bubbles up to the parent element, and then to the grandparent element, 
// and so on, until it reaches the root element (typically the document object). i.e if suppose any other element that comes in path
// (means parent, grandparent, etc) during bubbling phase and having the same event listenner, then it also runs that without our action, 
// thus to stop event bubbling we have event.stopPropagation();

document.getElementById('outerDiv').addEventListener('click', function (event) {
  console.log('Outer Div capturing');
  event.stopPropagation(); // Stops event from reaching inner div during capturing
}, true); // true means event-capturing will happen, means Jab event target ki taraf travel kar raha hoga 
// (document → parent → child → target), aur propagation path me outerDiv aayega,tab ye callback execute hoga BEFORE target reached.

document.getElementById('innerDiv').addEventListener('click', function (event) {
  console.log('Inner Div bubbling');
  event.stopPropagation(); // Stops event from reaching outer div during bubbling
}, false); //false means event-bubbling will happen, means Jab event target par execute ho chuka hoga aur ab wapas ancestors ki taraf 
// bubble kar raha hoga: (target → parent → grandparent → document), tab propagation path me innerDiv aayega, aur ye callback 
// execute hoga. Or else it 


// --------------------------------------------------------------------------------
//**** Form Submission: When a form is submitted, the submit event bubbles up from the <form> element.
// Form Submission: The form's default submit action is performed, which typically involves sending a request to the server and 
// navigating to a new page. so to avoid this default behaviour we use event.preventDefault();

document.querySelector('form').addEventListener('submit', function (event) {
  console.log('Form submitted');
  event.preventDefault(); // Prevents the form from submitting
  event.stopPropagation(); //prevent bubbling effect
});


// ------------------------------------------------------------------------------------


// ******** Prevention of default behaviours associated with certain HTML elements when an event occurs--->

// 1-) Form Submission: When a form is submitted, the default behavior is to send the form data to the server and reload the page. 
// This behavior can be prevented using event.preventDefault().

// 2-) Anchor Links (<a> tags): By default, clicking on an anchor link (<a>) navigates to the URL specified in the href attribute. 
// This can be prevented using event.preventDefault(). (now navigation not occur)

// 3-) Checkbox and Radio Button: When a checkbox or radio button is clicked, it toggles its checked state. 
// You can prevent this default behavior using event.preventDefault().

// 4-) Context Menu (right-click)
// By default, right-clicking on a web page opens the context menu. This behavior can be prevented.
//   <div id="myDiv">Right-click me</div>
//   document.getElementById('myDiv').addEventListener('contextmenu', function(e) {
//     e.preventDefault();
//     console.log('Context menu prevented');
//   });

// 5-) etc.....




// -------------------------------------------- In React--------------------------------------------

// ⚛️ React me bhi hota hai ye Bubbling and Capturing ?: YES, Exactly hota hai.

// Example: Capturing and Bubbling in react:
// In react The onClickCapture event is used to handle click events during the capture phase of event 
// propagation. Unlike the standard onClick, which operates in the bubbling phase, onClickCapture 
// intercepts the event before it reaches the target element.

import React from "react";
function App() {
  const handleCapture = () => {
    console.log("Captured during the capture phase!");
  };

  const handleBubble = () => {
    console.log("Handled during the bubble phase!");
  };

  return (
    <div onClickCapture={handleCapture} onClick={handleBubble}>
      <button>Click Me</button>
    </div>
  );
}
export default App;
// Output: when user clicks the button <button>Click Me</button> 
// First this will be printed "Captured during the capture phase!" then this "Handled during the bubble phase!".
// Becoz EVent traverse like this only.

// Fir event.stopPropagation() kyu nahi dikhta zyada react me?
// Because: Most cases me bubbling desirable hoti hai.
// But in cases me hum stop krte hai propogation ko react me, agr parents me ye sb defined ho onClick() function me:

// 1: dropdowns
// 2: modals
// 3: menus
// 4: tables
// 5: nested clickable cards
// 6: Or when we dont want that something click event trigger automatically in parent, then we define 
// stopPropagation() in click() function of parent. SO that it wont trigger while propogation is happening. 

example:
// Real use case where stopPropagation needed
// Here using e.stopPropagation() in onCLick() such that it wont traverse further. Else parent ka modal open kr dega.
<div onClick={() => openModal()}>
  <button
    onClick={(e) => {
      e.stopPropagation()
      deleteItem()
    }}
  >
    Delete
  </button>
</div>



// ---------------------------------------- INTERVIEW TRAPS --------------------------
What_it_will_print:
  <>
  <div
    onClickCapture={() => console.log("parent capture")}
    onClick={() => console.log("parent bubble")}
  >
    <button
      onClick={(e) => {
        e.stopPropagation()
        console.log("button")
      }}
    >
      Click
    </button>
  </div>
  </>

// Output:
// parent capture
// button

// NOT: parent bubble
// because: capturing phase already complete ho chuki thi
// then button pe: e.stopPropagation(), bubbling rok deta hai.