import React, {useState} from 'react';
import {Link} from "react-router-dom";
import MessagesPageUsers from "./MessagesPageUsers";
import {searchUser} from "../../services/authService";
import {sendMessage} from "../../services/messageService";

function SendMessageBox({MessageCss}) {
    // const user = useSelector((state) => state.auth.user)
    const [searchedUser,setSearchedUser] = useState([])
    const getSearchedUser = (userName) =>{
        searchUser(userName).then(data=>{
           setSearchedUser(data)
        })
    }

    return (
        <div>
            <Link to="/direct/inbox/"><div className={MessageCss.message_page_send_message_box_background}></div></Link>
            <div className={MessageCss.message_page_send_message_box_container}>
                <div className={MessageCss.message_page_send_message_box_upper_area}>
                   <Link to="/direct/inbox/"><svg className={MessageCss._ab6_} color="rgb(38, 38, 38)" fill="rgb(38, 38, 38)" height="18"
                              role="img" viewBox="0 0 24 24" width="18">
                       <polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor"
                                 strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
                       <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                             strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line>
                   </svg></Link>
                    <div style={{margin:"0 auto"}}>New Message</div>
                </div>
                <div className={MessageCss.message_page_send_message_box_search_area}>
                    <div style={{color: '#333'}}>To:</div>
                    <input onChange={event => getSearchedUser(event.target.value)} style={{marginLeft:"30px", border:0, outline:0, padding: '5px 10px', borderRadius: '20px'}} type="text" autoComplete="off" placeholder="Search..." spellCheck={false} />
                </div>
                <div style={{}} className={MessageCss.message_page_send_message_box_result_area}>
                    <div style={{fontWeight:"bold",margin:"16px"}}>Suggested</div>

                    <div>
                        {searchedUser.length?
                            searchedUser.map(u=>
                                <Link onClick={() => sendMessage(u.userName, null)} to="/direct/inbox/" key={u.userName}>
                                    <div><MessagesPageUsers name={u.userName} lastMessage={u.name} profilePicture={u.profilePicURL}/></div>
                                    </Link>
                                )
                            :
                            <div style={{color:"#8E8E8E",margin:"10px",height:"30px"}}>No account found.</div>
                            // user.followingId.slice(0, 6).map(u=>
                            //     <div><MessagesPageUsers name={u.userName} lastMessage={u.name} profilePicture={require("./photos/"+u.ppLink)}/></div>
                            // )
                        }

                    </div>

                </div>
            </div>
        </div>

    );
}

export default SendMessageBox;