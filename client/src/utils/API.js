import axios from "axios";

export default {
    signupUser: function(data) {
        return axios.post("/api/user-login/signup", data);
    },
    loginUser: function(data) {
        return axios.post("/api/user-login/login", data);
    },
    getUserByName: function(data){
        return axios.get("/api/user/"+data.name);
    }
};