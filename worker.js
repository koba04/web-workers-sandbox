class Client {
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

self.addEventListener("message", e => {
  if (e.data.type === "api") {
    console.log(e.data.payload);
  } else {
    self.postMessage({
      type: "greet",
      payload: "Hello"
    })
  }
})

setTimeout(async () => {
  const client = new Client();
  const result = await client.getData();
  console.log("client.getData()", result);
  await client.setBackgroundColor("tomato");
}, 1000);
