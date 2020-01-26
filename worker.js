importScripts("./WorkerClient.js");

const client = new WorkerClient();
client.on('show', async (data) => {
  const settings = await client.getSettings();
  await client.setBackgroundColor(settings.backgroundColor);
});

client.on("submit", data => {
  client.setSubmitError(data, "name should be over 6chars");
})