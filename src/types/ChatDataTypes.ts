export type chatRequestDataType = {
  role: "user" | "assistant";
  id: string;
  useWebSearch?: boolean;
  useCode?: boolean;
  reasoningContent?: string;
  content: string;
};
