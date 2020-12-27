import { ServiceBusService, createServiceBusService } from "azure-sb";

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
        From: "8174800796",
        CustomField: "2020-12-18'T'23:05:00.000Z" + "_" + "ONLINE",
        doctorId: "62f680b1-8e3e-4550-944a-4e9929a4ff6f",
        appointmentId: "56df86a1-8e3e-4250-943a-78as168116fa",
        messageType: "IVR_CALL",
      }),
      brokerProperties: {
        ScheduledEnqueueTimeUtc: "2020-12-27'T'01:45:00.000Z",
      },
    },
    (err, res) => {
      console.log(err);
      console.log(res);
    }
  );
}

main().catch((error) => {
  console.error("Error running sample:", error);
});
