import React, { useEffect, useRef } from "react";
import useChatStore from "../../store/chatStore";
import useAuthStore from "../../store/authStore";
import { timeAgo } from "../../utils/timeAgo";
import { Avatar, Box } from "@chakra-ui/react";

const Message = ({ message, MessageCss }) => {
  const currentUser = useAuthStore((state) => state.user);
  const data = useChatStore((state) => state);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  let messageCss = message.senderId === currentUser.uid ? MessageCss.messageOwner : MessageCss.message;
  return (
    <div
      ref={ref}
      className={`${messageCss}`}
    >
      <div className={`${MessageCss.messageInfo}`}>
        <Avatar src={message.senderId === currentUser.uid
          ? currentUser.profilePicURL
          : data.user.profilePicURL} name={message.senderId === currentUser.uid
            ? currentUser.username
            : data.user.username} sx={{ width: "40px", height: '40px' }} />

        {/* <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.profilePicURL
              : data.user.profilePicURL
          }
          alt=""
        /> */}
      </div>
      <div className={`${messageCss} ${MessageCss.messageContent}`}>
        {message.img && message.type === 'image' ? <img src={message.img} alt="" /> : message.img && message.type === 'video' ? <video src={message.img} className={MessageCss.previewVideo} controls disablePictureInPicture controlsList="nodownload noplaybackrate" /> : ''}
        <Box className={MessageCss.messageBox}>
          {message.text !== '' && <p>{message.text}</p>}
          <span style={{ fontSize: '11px', color: 'grey' }}>{timeAgo(message.date)}</span>
        </Box>
      </div>
    </div>
  );
};

export default Message;
