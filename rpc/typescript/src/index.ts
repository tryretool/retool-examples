import { RetoolSDK } from "rtsdk-dev";

// Load environment variables from .env file
import "dotenv/config";

const sdk = new RetoolSDK({
  apiToken: process.env.RETOOL_SDK_API_TOKEN || "api_token",
  host: process.env.RETOOL_SDK_HOST || "host",
  resourceId: process.env.RETOOL_SDK_ID || "resource_id",
  environmentName: process.env.RETOOL_SDK_ENV || "production",
  pollingIntervalMs: parseInt(process.env.RETOOL_SDK_POLL_INTERVAL || "1000"),
  version: process.env.RETOOL_SDK_VERSION || "0.0.1",
  logLevel: (process.env.RETOOL_SDK_LOG_LEVEL as any) || "info",
});

sdk.register({
  name: "helloWorld",
  args: {
    name: { type: "string", description: "Your name", required: true },
  },
  impl: async (args, _context) => {
    return `Hello, ${args.name}!`;
  },
});

sdk.register({
  name: "plusTwoNumbers",
  args: {
    firstNumber: {
      type: "number",
      description: "Enter your first number",
      required: true,
    },
    secondNumber: {
      type: "number",
      description: "Enter your second number",
      required: true,
    },
  },
  impl: async (args, _context) => {
    return args.firstNumber + args.secondNumber;
  },
});

sdk.listen();
