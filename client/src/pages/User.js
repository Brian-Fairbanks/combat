import React, {useEffect, useState} from "react";
// import Hero from "../components/Hero";
import api from "../utils/API";
import { useParams } from "react-router";
import Profile from "../components/Profile";
import UserSearch from "../components/UserSearch";

function User(props) {
  // get name from url
  let { userName } = useParams();

  // State for selected user data, called from Use Effect
  const [selectedUser, setSelectedUser] = useState();
  const [userError, setUserError] = useState(false);

  // Take userName parameter, and store user data from API in state
  useEffect(() => {
    if (userName){
      console.log("Cheking for user: "+userName);
      api.getUserByName({name:userName})
        .then(response => {
        console.log(response);
        if (response.status === 200){
          setSelectedUser(response.data);
        }
        else{setUserError(response.data.error)}
      })
    }
    }, [userName])


  return (
      <div>
          {userError?
            <div id="userError">{userError}</div>
            :""
          }

          {selectedUser?
            <Profile user={selectedUser}/>
            :
            <UserSearch/>
          }
      </div>
  );
}

export default User;