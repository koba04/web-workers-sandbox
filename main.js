console.log("load main.js");

const worker = new Worker("./worker.js");

worker.addEventListener("message", e => {
  document.getElementById("result").textContent = e.data.payload;
})

document.getElementById("main-button").addEventListener("click", () => {
  worker.postMessage({
    type: "greet"
  });
});