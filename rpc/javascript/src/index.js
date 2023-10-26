const { RetoolRPC } = require("retoolrpc");

// Load environment variables from .env file
require('dotenv').config(); 

const rpc = new RetoolRPC({
  apiToken: process.env.RETOOL_RPC_API_TOKEN || "api_token",
  host: process.env.RETOOL_RPC_HOST || "host",
  resourceId: process.env.RETOOL_RPC_RESOURCE_ID || "resource_id",
});

rpc.register({
  name: "helloWorld",
  arguments: {
    name: { type: "string", description: "Your name", required: true },
  },
  implementation: async (args, _context) => {
    return `Hello, ${args.name}!`;
  },
});

rpc.register({
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

rpc.listen();
