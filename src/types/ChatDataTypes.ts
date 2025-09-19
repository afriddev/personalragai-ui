export type chatRequestDataType = {
  role: "user" | "assistant";
  id: string;
  reasoningContent?: string;
  content: string;
};



export type searchResultDataType = {

  content:string
  url:string;
  title:string

}
export type chatMessageDataType = {
  role: "user" | "assistant";
  id: string;
  reasoningContent?: string;
  content: string;
  searchResults?: searchResultDataType[];
};
