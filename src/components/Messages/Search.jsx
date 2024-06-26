import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc, getDoc
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { Avatar } from "@chakra-ui/react";
import useChatStore from "../../store/chatStore";
const Search = ({ MessageCss }) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const showToast = useShowToast();

  const currentUser = useAuthStore((state) => state.user);
  const changeUser = useChatStore(state => state.changeUser);

  const handleSearch = async (e) => {
    let userName = e.target.value;
    setUsername(userName);
    if (userName !== '' && !currentUser?.username.includes(userName)) {
      const q = query(
        collection(firestore, "users"),
        where("username", "==", userName),
        // where("uid", "not-in", [currentUser.uid, ...currentUser.following])
      );

      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setUser(null);
          setErr(true);
        } else {
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
          });
          setErr(false);
        }
      } catch (error) {
        setUser(null);
        setErr(true);
      }
    }else{
      setUser(null);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(firestore, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(firestore, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(firestore, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            username: user.username,
            profilePicURL: user.profilePicURL,
          },
          [combinedId + ".date"]: Date.now(),
        });

        await updateDoc(doc(firestore, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            username: currentUser.username,
            profilePicURL: currentUser.profilePicURL,
          },
          [combinedId + ".date"]: Date.now(),
        });
        changeUser(currentUser, user);
      }else{
        changeUser(currentUser, user);
      }
    } catch (err) {
      showToast("", 'Please try after some time', "error");
    }

    setUser(null);
    setUsername("")
  };

  useEffect(() => {
    if (username === '') {
      setUser(null);
      setErr(false);
    }
  }, [username])


  return (
    <div className={MessageCss.search}>
      <div className={MessageCss.searchForm}>
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => handleSearch(e)}
          value={username}
        />
      </div>
      {err && <span className={MessageCss.center}>User not found!</span>}
      {user && (
        <div className={MessageCss.userChat} onClick={handleSelect}>
          <Avatar src={user?.profilePicURL} name={user?.username} size={"md"} />
          {/* <img src={user.profilePicURL} alt="logo" /> */}
          <div className={MessageCss.userChatInfo}>
            <span>{user.username}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
