console.log("load worker.js");

self.addEventListener("message", e => {
  console.log(e.data);
  self.postMessage({
    type: "greet",
    payload: "Hello"
  })
})
