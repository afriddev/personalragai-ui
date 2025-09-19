/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/conversation";
import { Message, MessageContent } from "@/components/ui/message";
import { RxCode } from "react-icons/rx";
import {
  PromptInput,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  type PromptInputMessage,
} from "@/components/ui/propt-input";
import { useState } from "react";
import { Response } from "@/components/ui/response";

import { Loader } from "@/components/ui/loader";
import { v4 as uuidv4 } from "uuid";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ui/reasoning";
import { Action, Actions } from "@/components/ui/actions";
import {
  CopyIcon,
  GlobeIcon,
  RefreshCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import type { ChatStatus } from "ai";

const CHAT_API = "http://localhost:8001/api/v1/chat";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [status, setStatus] = useState<ChatStatus>("ready");
  const [useWebSearch, setUseWebSearch] = useState<boolean>(true);
  const [useCode, setUseCode] = useState<boolean>(false);

  async function sendToBackend(message: any) {
    const allMessages = [...messages, message];
    setMessages(allMessages);
    const body = {
      query: message.content,
      messages: messages,
    };

    const controller = new AbortController();

    const resp = await fetch(CHAT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const reader = resp.body?.getReader();
    const decoder = new TextDecoder();
    const assistantPlaceholder = {
      id: uuidv4(),
      role: "assistant",
      content: "",
      reasoning: "",
    };

    setMessages((prev) => [...prev, assistantPlaceholder]);
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const tokenData = line.slice(6);

          if (tokenData.trim()) {
            const parsedToken = JSON.parse(tokenData);
            setStatus("streaming");

            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantPlaceholder.id
                  ? {
                      ...m,
                      content:
                        parsedToken.type === "content"
                          ? (m.content ?? "") + parsedToken.data
                          : m.content,
                      reasoning:
                        parsedToken.type === "reasoning"
                          ? (m.reasoning ?? "") + parsedToken.data
                          : m.reasoning,
                    }
                  : m
              )
            );
          }
        }
      }
    }

    setStatus("ready");
  }

  const handleSubmit = (message: PromptInputMessage) => {
    setStatus("submitted");
    sendToBackend({
      content: message.text,
      role: "user",
      id: uuidv4(),
    });
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-screen ">
      <div className="flex flex-col h-full ">
        <Conversation className="h-full ">
          <ConversationContent>
            {messages.map((message) => {
              if (message.content || message.reasoning)
                return (
                  <div key={message.id} className="mb-4">
                    <Message from={message.role}>
                      <MessageContent>
                        {message.reasoning && (
                          <Reasoning
                            className="w-full "
                            isStreaming={true}
                            defaultOpen={false}
                          >
                            <ReasoningTrigger />
                            <ReasoningContent>
                              {message.reasoning}
                            </ReasoningContent>
                          </Reasoning>
                        )}
                        <Response>{message.content}</Response>
                        {message.role === "assistant" && (
                          <Actions>
                            <Action label="Like">
                              <ThumbsUpIcon className="size-4" />
                            </Action>
                            <Action label="Dislike">
                              <ThumbsDownIcon className="size-4" />
                            </Action>
                            <Action label="Retry">
                              <RefreshCcwIcon className="size-3" />
                            </Action>
                            <Action label="Copy">
                              <CopyIcon className="size-3" />
                            </Action>
                          </Actions>
                        )}
                      </MessageContent>
                    </Message>
                  </div>
                );
              else return null;
            })}
            {status === "submitted" && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        

        <PromptInput onSubmit={handleSubmit}>
          <div className="flex  items-center pr-4">
            <PromptInputTextarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <PromptInputSubmit disabled={!input && !status} status={status} />
          </div>
          <PromptInputToolbar>
            <PromptInputTools>
              {/* <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>
              <PromptInputButton variant={"ghost"}>
                <MicIcon size={16} />
                <span className="sr-only">Microphone</span>
              </PromptInputButton> */}
              <PromptInputButton
                variant={useWebSearch ? "default" : "ghost"}
                onClick={() => setUseWebSearch(!useWebSearch)}
              >
                <GlobeIcon size={16} />
                <span>Search</span>
              </PromptInputButton>

              <PromptInputButton
                variant={useCode ? "default" : "ghost"}
                onClick={() => setUseCode(!useCode)}
              >
                <RxCode className="h-6 w-6" />
                <span>Code</span>
              </PromptInputButton>
            </PromptInputTools>
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
}
