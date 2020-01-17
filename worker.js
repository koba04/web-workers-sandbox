importScripts("./WorkerClient.js");

const client = new WorkerClient();
client.on('show', async (data) => {
  console.log("client.getData()", data);
  const settings = await client.getSettings();
  await client.setBackgroundColor(settings.backgroundColor);
})
