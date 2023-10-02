import { RetoolRPC } from "rtsdk-dev";

// Load environment variables from .env file
import "dotenv/config";

const retoolRpc = new RetoolRPC({
  apiToken: process.env.RETOOL_RPC_API_TOKEN || "api_token",
  host: process.env.RETOOL_RPC_HOST || "host",
  resourceId: process.env.RETOOL_RPC_RESOURCE_ID || "resource_id",
  environmentName: process.env.RETOOL_RPC_ENV || "production",
  pollingIntervalMs: parseInt(process.env.RETOOL_RPC_POLL_INTERVAL || "1000"),
  version: process.env.RETOOL_RPC_VERSION || "0.0.1",
  logLevel: (process.env.RETOOL_RPC_LOG_LEVEL as any) || "info",
});

retoolRpc.register({
  name: "helloWorld",
  arguments: {
    name: { type: "string", description: "Your name", required: true },
  },
  implementation: async (args, _context) => {
    return `Hello, ${args.name}!`;
  },
});

retoolRpc.register({
  name: "plusTwoNumbers",
  arguments: {
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
  implementation: async (args, _context) => {
    return args.firstNumber + args.secondNumber;
  },
});

if (process.env.CLI_GENERATED_MESSAGE) {
  console.log("\n" + process.env.CLI_GENERATED_MESSAGE + "\n");
}

retoolRpc.listen();
