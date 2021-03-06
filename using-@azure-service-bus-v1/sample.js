const { ServiceBusClient } = require("@azure/service-bus");

async function main() {
  // Set SERVICEBUS_CONNECTION_STRING environment variable before running the sample
  const connectionStringASB = process.env.SERVICEBUS_CONNECTION_STRING;
  const sbService = ServiceBusClient.createFromConnectionString(
    connectionStringASB
  );
  // Set QUEUE_NAME environment variable before running the sample
  const queueName = process.env.QUEUE_NAME;
  const queueClient = sbService.createQueueClient(queueName);
  const sender = queueClient.createSender();
  const message = {
    // Message that looks similar to what was provided in the snippet
    body: JSON.stringify({
      From: "8080808080",
      CustomField: "2020-08-08'T'08:08:08.080Z" + "_" + "ONLINE",
      doctorId: "08f080f8-8080-8880-808a-8080808080fabc",
      appointmentId: "09f090f9-9090-9990-909a-9090909090fabc",
      messageType: "ABC_CALL",
    }),
    messageType: "ABC_CALL",
    scheduledEnqueueTimeUtc: "2020-08-08'T'08:08:08.080Z",
  };
  const sequenceNumbers = await sender.scheduleMessages(
    message.scheduledEnqueueTimeUtc,
    [{ body: message.body }]
  );
  console.log(sequenceNumbers[0].toNumber());
  await sbService.close();
}

main().catch((error) => {
  console.error("Error running sample:", error);
});
