import { ServiceBusClient } from "@azure/service-bus";
import { DefaultDataTransformer } from "@azure/amqp-common";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main(): Promise<void> {
  const connectionStringASB = process.env.SERVICEBUS_CONNECTION_STRING;
  const sbService = ServiceBusClient.createFromConnectionString(
    connectionStringASB
  );
  const queueName = process.env.QUEUE_NAME;
  const queueClient = sbService.createQueueClient(queueName);
  const sender = queueClient.createSender();
  const dt = new DefaultDataTransformer();
  const message = {
    // Message that looks similar to what was provided in the snippet without the "JSON.stringify()" call
    // (Removed the "JSON.stringify()" call on the body as that would be done by the SDK for the messages that are not of buffer type)
    body: {
      From: "8080808080",
      CustomField: "2020-08-08'T'08:08:08.080Z" + "_" + "ONLINE",
      doctorId: "08f080f8-8080-8880-808a-8080808080fabc",
      appointmentId: "09f090f9-9090-9990-909a-9090909090fabc",
      messageType: "ABC_CALL",
    },
    messageType: "ABC_CALL",
    scheduledEnqueueTimeUtc: "2020-08-08'T'08:08:08.080Z",
  };
  const sequenceNumbers = await sender.scheduleMessages(
    message.scheduledEnqueueTimeUtc as any,
    // Workaround that adds the encoding step for the message body for the bug in version 1
    [{ body: dt.encode(message.body) }]
  );
  console.log(sequenceNumbers[0].toNumber());
  await sbService.close();
}

main().catch((error) => {
  console.error("Error running sample:", error);
});
