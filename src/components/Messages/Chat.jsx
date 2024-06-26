import Messages from "./Messages";
import Input from "./Input";
import useChatStore from "../../store/chatStore";
import { Center, Text } from "@chakra-ui/react";

const Chat = ({ MessageCss }) => {
  const data = useChatStore((state) => state);

  return (
    <div className={MessageCss.chat}>
      {Object.keys(data.user).length !== 0 ? (
        <>
          <div className={MessageCss.chatInfo}>
            <span>{data.user.username}</span>
            {/* <div className={MessageCss.chatIcons}>
              <img src={Cam} alt="Cam" />
              <img src={Add} alt="Add" />
              <img src={More} alt="More" />
            </div> */}
          </div>
          <Messages MessageCss={MessageCss} />
          <Input MessageCss={MessageCss} />
        </>
      ) : (
        <Center className={MessageCss.placeholder}>
          <Text fontSize="lg" color="gray.500">
            Search user to start messaging or Select a chat
          </Text>
        </Center>
      )}
    </div>
  );
};

export default Chat;
