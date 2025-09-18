/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { cn } from "@/lib/utils";
import { LuAsterisk } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";

interface InputInterface extends React.ComponentProps<"input"> {
  label?: string;
  errorMessage?: any;
  mandatory?: boolean;
  icon?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputInterface>(
  (
    { className, type, label, errorMessage, mandatory, icon, ...props },
    ref
  ) => {
    function getIcon() {
      switch (icon?.toLowerCase()) {
        case "search":
          return <IoSearch className="w-5 h-5" />;
      }
    }

    return (
      <div className={`flex flex-col gap-1 ${label && "h-16"}`}>
        <div>
          {label && (
            <label className=" font-medium mb-1 flex items-center">
              {label}
              {mandatory && (
                <span className="w-3 h-3">
                  <LuAsterisk className="w-3  h-3  text-destructive" />
                </span>
              )}
            </label>
          )}
          <div className="relative flex items-center ">
            <div className="absolute pl-1">{getIcon()}</div>
            <input
              autoComplete="off"
              ref={ref} 
              type={type}
              data-slot="input"
              className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                `${icon && "pl-7"}`,
                className
              )}
              {...props}
            />
          </div>
        </div>
        {errorMessage && (
          <p className="text-destructive">
            {<label className="">{errorMessage}</label>}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input"; // This is useful for debugging.

export { Input };
