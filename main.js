import { MainClient } from './MainClient.js';
import { api, getSettings } from "./api.js";

Promise.all([api(), getSettings()]).then(([res, settings]) => {
  const client = new MainClient(["./worker.js"], res, settings);

  document.getElementById("main-button").addEventListener("click", () => {
    client.greet();
  });

  const result = document.getElementById("result");
  const ul = document.createElement("ul");
  res.forEach(data => {
    const li = document.createElement("li");
    li.textContent = `${data.id}:${data.title}`;
    ul.appendChild(li);
  });
  result.appendChild(ul);

  client.trigger('show', res);
});