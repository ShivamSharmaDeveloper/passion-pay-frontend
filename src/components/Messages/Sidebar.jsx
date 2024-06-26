import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = ({ MessageCss }) => {
  return (
    <div className={MessageCss.sidebar}>
      <Navbar MessageCss={MessageCss} />
      <Search MessageCss={MessageCss} />
      <Chats MessageCss={MessageCss} />
    </div>
  );
};

export default Sidebar;
