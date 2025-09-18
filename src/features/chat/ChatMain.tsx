/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import {
  PromptInput,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  type PromptInputMessage,
} from "@/components/ui/propt-input";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ui/reasoning";
import { Action, Actions } from "@/components/ui/actions";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/conversation";
import { Message, MessageContent } from "@/components/ui/message";
import type { ChatStatus } from "ai";

import {
  CopyIcon,
  GlobeIcon,
  RefreshCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { RxCode } from "react-icons/rx";
import { Loader } from "@/components/ui/loader";
import { Response } from "@/components/ui/response";
import type { chatRequestDataType } from "@/types/ChatDataTypes";

const CHAT_API = "http://localhost:8001/api/v1/chat";

function ChatMain() {
  const [status, setStatus] = useState<ChatStatus>("ready");
  const [useWebSearch, setUseWebSearch] = useState<boolean>(false);
  const [useCode, setUseCode] = useState<boolean>(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<chatRequestDataType[]>([]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendToBackend(message: chatRequestDataType) {
    const allMessages = [...messages, message];
    setMessages(allMessages);
    const body = {
      content: message.content,
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
    const assistantPlaceholder: chatRequestDataType = {
      id: uuidv4().toString(),
      role: "assistant",
      content: "",
      reasoningContent: "",
      useWebSearch: useWebSearch,
      useCode: useCode,
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
                          ? (m.reasoningContent ?? "") + parsedToken.data
                          : m.reasoningContent,
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

  function handleSubmit(message: PromptInputMessage) {
    if (message.text) {
      setStatus("submitted");
      sendToBackend({
        id: uuidv4().toString(),
        role: "user",
        content: message.text,
        reasoningContent: "",
        useWebSearch: useWebSearch,
        useCode: useCode,
      });
      setInput("");
    }
  }

  return (
    <div className="w-full h-full overflow-auto max-h-[100vh]  flex flex-col justify-between items-center py-5">
      <div className="w-full h-full   pb-36 flex justify-center items-center">
        <Conversation className="h-full  flex justify-center items-center">
          <ConversationContent className="flex flex-col justify-center items-center">
            {messages.map((message) => {
              if (message.content || message.reasoningContent)
                return (
                  <div key={message.id} className="mb-4 w-[40vw]">
                    <Message from={message.role}>
                      <MessageContent>
                        {message.reasoningContent && (
                          <Reasoning
                            className="w-full "
                            isStreaming={true}
                            defaultOpen={false}
                          >
                            <ReasoningTrigger />
                            <ReasoningContent>
                              {message.reasoningContent}
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
            {status === "submitted" && (
              <div className="w-[40vw] items-start">
                <Loader />
              </div>
            )}
            <div ref={bottomRef} />
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>
      <div className="w-[40vw] absolute bottom-5">
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

export default ChatMain;
