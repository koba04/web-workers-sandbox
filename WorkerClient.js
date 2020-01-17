class WorkerClient {
  constructor() {
    this.listeners = new Map();
    self.addEventListener("message", e => {
      if (e.data.type === "event") {
        const handlers = this.listeners.get(e.data.payload.event);
        if (handlers) {
          handlers.forEach(handler => handler(e.data.payload.data));
        }
      } else if (e.data.type === "api") {
        console.log(e.data.payload);
      } else if (e.data.type === "greet") {
        self.postMessage({
          type: "greet",
          payload: "Hello"
        })
      }
    })
  }
  on(event, handler) {
    const handlers = this.listeners.get(event) || [];
    handlers.push(handler);
    this.listeners.set(event, handlers);
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
  async getSettings() {
    return new Promise(resolve => {
      self.addEventListener("message", e => {
        if (e.data.type === "settings") {
          resolve(e.data.payload);
        }
      });
      self.postMessage({
        type: "settings"
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