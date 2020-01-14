class WorkerClient {
  constructor() {
    self.addEventListener("message", e => {
      if (e.data.type === "api") {
        console.log(e.data.payload);
      } else if (e.data.type === "greet") {
        self.postMessage({
          type: "greet",
          payload: "Hello"
        })
      }
    })
  }
  async getData() {
    return new Promise(resolve => {
      self.addEventListener("message", e => {
        if (e.data.type === "api") {
          resolve(e.data.payload);
        }
      });
      self.postMessage({
        type: "api"
      })
    });
  }
  async setBackgroundColor(color) {
    return new Promise((resolve, reject) => {
      self.addEventListener("message", e => {
        if (e.data.type === "setBackgroundColor") {
          if (e.data.result === "success") {
            resolve();
          } else {
            reject();
          }
        }
      });
      self.postMessage({
        type: "setBackgroundColor",
        payload: color,
      })
    });
  }
}