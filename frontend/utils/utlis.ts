import axios from "axios";
import { toast } from "react-toastify";
import { setAvatarRoute } from "./APIRoutes";
import Router from "next/router";

const toastOptions = {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    // theme: "dark",
  };


export const setProfilePicture = async (event:any, avatars:any, selectedAvatar:any) => {//seems problem setting in local storage
    if (selectedAvatar === undefined) {
        toast.error("Please select an avatar", toastOptions);
    } else {
        console.log("Avatar selected");
        
        const user = await JSON.parse(localStorage.getItem("user_data")||'null');
        
        // try{
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
            image: avatars[selectedAvatar],
            isSet: true,
        });
        console.log("true/false", data.isSet);
        
        if (data.isSet) {
            console.log(data.isSet);
            
            user.isAvatarImageSet = true;
            user.avatarImage = data.image;
            localStorage.setItem("user_data",JSON.stringify(user));
            Router.replace("/chat");
        } else {
            toast.warn("Error setting avatar. Please try again.", toastOptions);
        }
        // }catch(error){
        //     console.log("error",error);
        //     toast.error("error", toastOptions)
        // }
               
    }
};