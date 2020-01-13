import { api } from "./api.js";

const worker = new Worker("./worker.js");

let apiResponse = [];

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

document.getElementById("main-button").addEventListener("click", () => {
  worker.postMessage({
    type: "greet"
  });
});

api().then(res => {
  apiResponse = res;
  const result = document.getElementById("result");
  const ul = document.createElement("ul");
  res.forEach(data => {
    const li = document.createElement("li");
    li.textContent = `${data.id}:${data.title}`;
    ul.appendChild(li);
  });
  result.appendChild(ul);
});