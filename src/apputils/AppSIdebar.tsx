import { FiSidebar } from "react-icons/fi";
import { MdOutlineChatBubbleOutline, MdOutlineImage } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import { FiFolderPlus } from "react-icons/fi";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { CiSettings } from "react-icons/ci";

function AppSidebar() {
  return (
    <div className="lg:w-[15vw] h-full bg-background  border-r  border-foreground/10 ">
      <div className="w-full h-full p-2 justify-between flex flex-col">
        <div className="flex flex-col w-full h-full ">
          <div className="p-1 justify-between flex items-center">
            <img
              alt="logo"
              src="logo.png"
              className="h-10 w-10 object-cover cursor-pointer"
            />
            <FiSidebar className="h-10 w-10 cursor-pointer lg:hover:bg-muted p-2 rounded " />
          </div>
          <div>
            <div className="flex flex-col gap-1 pt-5">
              <div className="flex items-center gap-3 justify-between  w-full p-3 lg:hover:bg-muted rounded cursor-pointer">
                <p className=" font-medium">New Chat</p>
                <MdOutlineChatBubbleOutline className="h-6 w-6" />
              </div>

              <div className="flex items-center gap-3 justify-between  w-full p-3 lg:hover:bg-muted rounded cursor-pointer">
                <p className=" font-medium">Search Chats</p>
                <LuSearch className="h-6 w-6" />
              </div>

              <div className="flex items-center gap-3 justify-between  w-full p-3 lg:hover:bg-muted rounded cursor-pointer">
                <p className=" font-medium">Generate Image</p>
                <MdOutlineImage className="h-6 w-6" />
              </div>

              <div className="flex items-center gap-3 justify-between  w-full p-3 lg:hover:bg-muted rounded cursor-pointer">
                <p className=" font-medium">New Project</p>
                <FiFolderPlus className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex  items-center justify-between cursor-pointer gap-2 shadow border border-foreground/20 lg:hover:shadow-xs lg:hover:bg-muted  rounded p-2 px-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="logo.png" alt="@shadcn" />
            </Avatar>
            <p className=" text-foreground    text-center">Shaik Afrid</p>
          </div>
          <CiSettings className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default AppSidebar;
