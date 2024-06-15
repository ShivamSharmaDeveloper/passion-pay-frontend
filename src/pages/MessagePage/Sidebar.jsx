import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"
import Messages from './Messages.module.css';

const Sidebar = () => {
  return (
    <div className={Messages.sidebar}>
      <Navbar />
      <Search/>
      <Chats/>
    </div>
  );
};

export default Sidebar;
