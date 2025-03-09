import { AppContext } from "../apps/site.ts";
import { useComponent } from "./Component.tsx";
import ChatMessages from "./ChatMessages.tsx";

export interface Message {
  content: string;
  role: "user" | "assistant";
  timestamp: string;
}

export interface ChatState {
  messages: Message[];
  isLoading?: boolean;
  threadId?: string;
  resourceId?: string;
  site?: string;
}

// Action handler for processing messages
export const action = async (
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<ChatState> => {
  if (req.method === "POST") {
    const formData = await req.formData();
    const message = formData.get("message")?.toString() || "";
    const currentMessages = JSON.parse(
      formData.get("messages")?.toString() || "[]",
    );
    const threadId = formData.get("threadId")?.toString() ||
      crypto.randomUUID();
    const resourceId = formData.get("resourceId")?.toString() || "default";
    const site = formData.get("site")?.toString() || "mcp";

    // Add user message
    const newMessages = [...currentMessages, {
      content: message,
      role: "user",
      timestamp: new Date().toISOString(),
    }];

    // Get AI response - now with thread and resource IDs
    const aiResponse = await ctx.invoke("site/actions/chat/ai-response.ts", {
      message,
      threadId,
      resourceId,
      site,
    });

    newMessages.push({
      content: aiResponse || "I'm sorry, I couldn't process that request.",
      role: "assistant",
      timestamp: new Date().toISOString(),
    });

    return { messages: newMessages, threadId, resourceId, site };
  }

  return {
    messages: [],
    threadId: crypto.randomUUID(),
    resourceId: "default",
    site: "mcp",
  };
};

export default function Chat(
  { messages = [], threadId, resourceId, site = "mcp" }: ChatState,
) {
  return (
    <div class="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-base-100 rounded-lg shadow-lg">
      {/* Site Configuration */}
      <div class="border-b border-base-200 p-4">
        <div class="flex gap-2 items-center">
          <label class="text-sm font-medium">Site:</label>
          <input
            type="text"
            name="site"
            class="input input-bordered input-sm flex-1 max-w-[200px]"
            value={site}
            form="chat-form"
          />
        </div>
      </div>

      {/* Chat Messages Container */}
      <div
        id="messages-container"
        class="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <ChatMessages messages={messages} />
      </div>

      {/* Message Input Form */}
      <form
        id="chat-form"
        class="border-t border-base-200 p-4"
        hx-post={useComponent(import.meta.url)}
        hx-target="closest div"
        hx-swap="outerHTML"
      >
        <input
          type="hidden"
          name="messages"
          value={JSON.stringify(messages)}
        />
        <input
          type="hidden"
          name="threadId"
          value={threadId}
        />
        <input
          type="hidden"
          name="resourceId"
          value={resourceId}
        />

        <div class="flex gap-2">
          <input
            type="text"
            name="message"
            class="input input-bordered flex-1"
            placeholder="Type your message..."
            required
          />
          <button
            type="submit"
            class="btn btn-primary"
          >
            <span class="[.htmx-request_&]:hidden">Send</span>
            <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
          </button>
        </div>
      </form>

      <script>
        {`
          document.body.addEventListener('htmx:afterRequest', function(evt) {
            const messagesContainer = document.getElementById('messages-container');
            if (messagesContainer) {
              messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
          });
          // Initial scroll
          const messagesContainer = document.getElementById('messages-container');
          if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }
        `}
      </script>
    </div>
  );
}
