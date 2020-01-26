export class MainClient {
  constructor(scripts, apiResponse, settings) {
    this.workers = [];
    document.getElementById("form").addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const handler = e => {
        if (e.data.type === "setSubmitError") {
          console.log(e.data.payload);
          document.getElementById("form-error").textContent = e.data.payload.errorMessage;
        }
      }

      this.workers.forEach(worker => {
        worker.addEventListener("message", handler);
      });
      this.trigger("submit", Array.from(formData.entries()).reduce((acc, [k, v]) => {
        return {
          ...acc,
          [k]: v,
        };
      }, {}));
      // TODO: wait all results and cancel the submit if there is any error

      // TODO: all removeEventListeners
    });
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