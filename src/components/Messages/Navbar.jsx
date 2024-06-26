import useAuthStore from '../../store/authStore'
import { Avatar } from '@chakra-ui/react'

const Navbar = ({ MessageCss }) => {
  const currentUser = useAuthStore((state) => state.user);

  return (
    <div className={MessageCss.navbar}>
      <span className={MessageCss.logo}>Messages</span>
      <div className={MessageCss.user}>
        <Avatar src={currentUser?.profilePicURL} name={currentUser?.username} size={"sm"} />
        <span>{currentUser.username}</span>
        {/* <button onClick={()=>signOut(auth)}>logout</button> */}
      </div>
    </div>
  )
}

export default Navbar