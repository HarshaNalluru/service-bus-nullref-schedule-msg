import { ServiceBusService, createServiceBusService, Azure } from "azure-sb";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main(): Promise<void> {
  const connectionStringASB = process.env.SERVICEBUS_CONNECTION_STRING;
  const sbService: ServiceBusService = createServiceBusService(
    connectionStringASB
  );
  const queueName = process.env.QUEUE_NAME;
  sbService.sendQueueMessage(
    queueName,
    {
      body: JSON.stringify({
        From: "8080808080",
        CustomField: "2020-08-08'T'08:08:08.080Z" + "_" + "ONLINE",
        doctorId: "08f080f8-8080-8880-808a-8080808080fabc",
        appointmentId: "09f090f9-9090-9990-909a-9090909090fabc",
        messageType: "ABC_CALL",
      }),
      brokerProperties: {
        ScheduledEnqueueTimeUtc: "2020-08-08'T'08:08:08.080Z",
        Label: "azure-sb",
      },
    },
    (err: Error, res: Azure.ServiceBus.Response) => {
      console.log(err);
      console.log(res);
    }
  );
}

main().catch((error) => {
  console.error("Error running sample:", error);
});
