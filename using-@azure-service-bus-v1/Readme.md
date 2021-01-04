## To execute the JS sample
- Install [Node.js](https://nodejs.org/en/)
- Clone the [service-bus-nullref-schedule-msg](https://github.com/HarshaNalluru/service-bus-nullref-schedule-msg) repo
- Navigate to [using-@azure-service-bus-v1](https://github.com/HarshaNalluru/service-bus-nullref-schedule-msg/tree/main/using-%40azure-service-bus-v1) folder
- Run `npm install` for the dependencies(`@azure/service-bus` version 1)
- Set the `SERVICEBUS_CONNECTION_STRING` and `QUEUE_NAME` environment variables
- Run the sample with `node sample.js`
- A message will be sent to the service, and the corresponding sequence number would be logged in the terminal/cmd-prompt
- You can verify the sent message by "peek"-ing into the message in the "Service Bus Explorer" view in the portal