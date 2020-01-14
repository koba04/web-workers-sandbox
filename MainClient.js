export class MainClient {
  constructor(scripts, apiResponse) {
    this.workers = [];
    scripts.forEach(script => {
      const worker = new Worker(script);
      this.workers.push(worker);
      worker.addEventListener("message", e => {
        if (e.data.type === "api") {
          worker.postMessage({
            type: "api",
            payload: apiResponse,
          })
        } else if (e.data.type === "setBackgroundColor") {
          document.getElementById("result").style.backgroundColor = e.data.payload;
          worker.postMessage({
            type: "setBackgroundColor",
            result: "sucess",
          });
        } else if (e.data.type === "greet") {
          document.getElementById("console").textContent = e.data.payload;
        }
      })
    })
  }
  greet() {
    this.workers.forEach(worker => {
      worker.postMessage({
        type: "greet"
      });
    })
  }
}