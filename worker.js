importScripts("./WorkerClient.js");

setTimeout(async () => {
  const client = new WorkerClient();
  const result = await client.getData();
  console.log("client.getData()", result);
  await client.setBackgroundColor("tomato");
}, 1000);
