import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IoIosSend } from "react-icons/io";

function Chat() {
  return (
    <div className="p-6 justify-between flex flex-col pl-[20vw] bg-white h-[100vh] text-black w-full">
      <div>Chat</div>
      <div className="flex items-center justify-center w-full">
        <div className="w-[50vw] h-[10vh] rounded relative bg-[#201e1e]">
          <Textarea
            placeholder="Ask about anything"
            className="outline-none h-full  resize-none border-none focus-visible:border-none text-white md:text-lg shadow-none focus-visible:ring-0 bg-[#201e1e] placeholder:text-gray-300 placeholder:text-lg w-[80%] overflow-hidden"
          />

          <div className="absolute right-7 top-0 h-full flex items-center justify-center">
            <Button>
              <IoIosSend className="" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
