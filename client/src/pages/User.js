import React, {useEffect, useState} from "react";
import Hero from "../components/Hero";
import api from "../utils/API";
import { useParams } from "react-router";

function User(props) {
  // get name from url
  let { userName } = useParams();

  // State for selected user data, called from Use Effect
  const [selectedUser, setSelectedUser] = useState();

  // Take userName parameter, and store user data from API in state
  useEffect(() => {
    if (userName){
      console.log(props);
      // userName = props.params.userName;
      // Check for token to keep user logged in
        console.log("Cheking for user: "+userName);
        api.getUserByName({name:userName})
          .then(response => {
          console.log(response);
          if (response.data.username){
            setSelectedUser(response.data);
          }
        })
      }
    }, [userName])


  return (
      <div>
          {selectedUser?
            <div>{JSON.stringify(selectedUser, null, 2)}</div>
            :
            <div id="userError">User Not Found</div>
          }
      </div>
  );
}

export default User;