import { RetoolSDK } from "@hdoan_741/rtsdk";

// Load environment variables from .env file
import "dotenv/config";

const sdk = new RetoolSDK({
  apiToken: process.env.RETOOL_SDK_API_TOKEN || "api_token",
  host: process.env.RETOOL_SDK_HOST || "host",
  resourceId: process.env.RETOOL_SDK_ID,
  environment: process.env.RETOOL_SDK_ENV || "production",
  pollingIntervalMs: parseInt(process.env.RETOOL_SDK_POLL_INTERVAL || "1000"),
  version: process.env.RETOOL_SDK_VERSION || "0.0.1",
  logLevel: (process.env.RETOOL_SDK_LOG_LEVEL as any) || "info",
});

sdk.register({
  name: "helloWorld",
  args: {
    name: { type: "string", doc: "your name", required: true },
  },
  impl: async (args, _context) => {
    return `Hellooo, ${args.name}!`;
  },
});

sdk.listen();
