# ⏱️ JavaScript Rate Limit Utility

A simple **rate limiting (throttle-style)** function written in JavaScript.
It ensures that a function does not execute more frequently than a specified delay while still allowing a final delayed call.

---

## 📌 Features

* Limits how often a function can run
* Uses **closures** to maintain internal state
* Supports trailing execution (last call runs after delay)
* Lightweight and dependency-free

---

## 🚀 Usage

### 1️⃣ Import / Add Function

```js
function rateLimit(fn, delay) {
  let lastCallTime = 0;
  let timerId = null;

  return function limitedFunction() {
    const currentTime = Date.now();

    if (currentTime - lastCallTime >= delay) {
      fn.apply(this, arguments);
      lastCallTime = currentTime;

      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
    } else if (!timerId) {
      timerId = setTimeout(() => {
        fn.apply(this, arguments);
        lastCallTime = Date.now();
        timerId = null;
      }, delay);
    }
  };
}
```

---

### 2️⃣ Example

```js
const limitedFn = rateLimit(() => {
  console.log("Function executed!");
}, 1000);

limitedFn();
limitedFn();
limitedFn();
```

---

## 🧠 How It Works

* Stores last execution time using closure.
* Executes immediately if delay has passed.
* Otherwise schedules a delayed execution.
* Prevents repeated rapid calls.

---

## ✅ Use Cases

* Button click protection
* API request limiting
* Scroll or resize event optimization
* Performance improvement in UI apps

---

## 📄 License

Free to use for learning and projects.
