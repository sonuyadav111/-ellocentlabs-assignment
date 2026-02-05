// Question 1: API Data Processing
async function getUsersByCity(cityName) {
  // Fetch data from API
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  
  // Check response status
  if (!response.ok) {
    throw new Error("HTTP error!");
  }
  
  // Parse JSON data
  const users = await response.json();
  
  // Process: filter, sort, map
  const result = users
    .filter(user => 
      user.address.city.toLowerCase() === cityName.toLowerCase()
    )
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(user => ({
      name: user.name,
      email: user.email
    }));
  
  return result;
}

// Example usage
getUsersByCity("London").then(users => {
  console.log(users);
});


// Question 2: Rate Limiter
function rateLimit(fn, delay) {
  // Use closure to maintain state
  let lastCallTime = 0;
  let timerId = null;
  
  return function limitedFunction() {
    const currentTime = Date.now();
    
    // Check if delay has passed
    if (currentTime - lastCallTime >= delay) {
      // Execute the original function
      fn.apply(this, arguments);
      
      // Update last call time
      lastCallTime = currentTime;
      
      // Clear any existing timer
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
    } else if (!timerId) {
      // Schedule execution after delay
      timerId = setTimeout(() => {
        fn.apply(this, arguments);
        lastCallTime = Date.now();
        timerId = null;
      }, delay);
    }
    // Otherwise, ignore the call
  };
}

// Example usage
const limitedFn = rateLimit(() => {
  console.log("Function executed!");
}, 1000);