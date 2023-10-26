# Initialize the RPC.
import asyncio
import os
from typing import Any, Dict, List

from retoolrpc.rpc import RetoolRPC
from retoolrpc.utils.types import RetoolContext, RetoolRPCConfig

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

async def run_rpc():
    rpc_config = RetoolRPCConfig(
        api_token=os.getenv("RETOOL_RPC_API_TOKEN", default="api_token"),  # replace with retool rpc access token
        host=os.getenv("RETOOL_RPC_HOST", default="host"),  # replace with your host URL
        resource_id=os.getenv("RETOOL_RPC_RESOURCE_ID", default="resource_id"),  # replace with retool rpc resource id
    )

    rpc = RetoolRPC(rpc_config)

    async def helloWorld(
        args: Dict[str, str], context: RetoolContext
    ) -> Dict[str, Any]:
        return f"Hello {args['name']}"

    rpc.register(
        {
            "name": "helloWorld",
            "arguments": {
                "name": {
                    "type": "string",
                    "description": "Your name",
                    "required": True,
                    "array": False,
                },
            },
            "implementation": helloWorld,
            "permissions": None,
        }
    )

    async def plusTwoNumbers(args: Dict[str, int], context: RetoolContext) -> int:
        return args["firstNumber"] + args["secondNumber"]

    rpc.register(
        {
            "name": "plusTwoNumbers",
            "arguments": {
                "firstNumber": {
                    "type": "number",
                    "description": "First number",
                    "required": True,
                    "array": False,
                },
                "secondNumber": {
                    "type": "number",
                    "description": "Second number",
                    "required": True,
                    "array": False,
                },
            },
            "implementation": plusTwoNumbers,
            "permissions": None,
        }
    )

    await rpc.listen()


# Run the async function
if __name__ == "__main__":
    if os.getenv('CLI_GENERATED_MESSAGE', False):
        print("\n" + os.getenv('CLI_GENERATED_MESSAGE') + "\n");
    asyncio.run(run_rpc())
