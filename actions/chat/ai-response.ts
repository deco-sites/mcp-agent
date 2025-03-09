import { siteTools } from "site/utils.ts";
import { AppContext } from "../../apps/site.ts";

export interface Props {
  message: string;
  site: string;
  threadId?: string;
  resourceId?: string;
}

/**
 * Handles AI chat responses using Mastra agent
 */
export default async function aiResponse(
  { message, threadId = "default", resourceId = "default", site = "mcp" }:
    Props,
  _req: Request,
  ctx: AppContext,
) {
  try {
    // Only connect if not already connected

    // Use the agent with the available tools, now with thread and resource IDs
    const response = await ctx.agent.stream(message, {
      threadId,
      resourceId,
      tools: await siteTools(site),
    });

    let fullResponse = "";
    for await (const part of response.fullStream) {
      switch (part.type) {
        case "error":
          console.error(part.error);
          throw new Error("Failed to process request");
        case "text-delta":
          fullResponse += part.textDelta;
          break;
        case "tool-call":
          console.info(`Tool call: ${part.toolName}`);
          break;
      }
    }

    return fullResponse;
  } catch (error) {
    console.error(error);
    return `I apologize, but I encountered an error processing your request.`;
  }
}
