import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface ChatMessageInterface {
  content: string;
}

function ChatMessage({ content }: ChatMessageInterface) {
  return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>;
}

export default ChatMessage;
