import { clx } from "../sdk/clx.ts";
import { Message } from "./Chat.tsx";

export default function ChatMessages({ messages }: { messages: Message[] }) {
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          class={clx(
            "flex flex-col max-w-[80%] rounded-lg p-3",
            message.role === "user"
              ? "ml-auto bg-primary text-primary-content"
              : "bg-base-200",
          )}
        >
          <p class="text-sm">{message.content}</p>
          <span class="text-xs opacity-70 mt-1">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      ))}
    </>
  );
}
