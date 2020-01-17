export class MainClient {
  constructor(scripts, apiResponse, settings) {
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
        } else if (e.data.type === "settings") {
          worker.postMessage({
            type: "settings",
            payload: settings,
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
  trigger(event, data) {
    this.workers.map(worker => {
      worker.postMessage({
        type: 'event',
        payload: {
          event,
          data
        }
      })
    });
  }
  greet() {
    this.workers.forEach(worker => {
      worker.postMessage({
        type: "greet"
      });
    })
  }
}