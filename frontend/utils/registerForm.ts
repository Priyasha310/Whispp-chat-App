import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import { registerRoute } from "./APIRoutes";


const toastOptions = {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    // theme: 'dark',
};

export const handleChange = (event:any, values:any, setValues:any) => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });    
}

export const handleValidation = (values:any, setValues:any) => {
    let isValid = true;
    const {username, email, password, confirmPassword} = values;
    console.log(values);

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!username || !email || !password || !confirmPassword){ 
        toast.error('Enter required data', toastOptions);
        return false;
    }else if( username.length < 4){
        toast.error('Username must be at least 4 characters long', toastOptions);
        isValid = false;
    }
    if(!emailRegex.test(email)) {
        toast.error('Enter valid email', toastOptions);
        isValid = false;
    }

    if(password.length < 3){
        toast.error('Choose a strong password', toastOptions);
        return false;
    } else if(password !== confirmPassword){
        toast.error("Password and confirm Password must be same", toastOptions);
        isValid = false;
    } 
    // if (isValid) toast.success('Succesfully logging in!');
    return isValid;
}

export const handleSubmit = async (e:any, values:any, setValues:any) => {
    e.preventDefault();
    if(handleValidation(values, setValues)){
    console.log("in validation", registerRoute);
    const {username, email,  password, confirmPassword} = values;
    const {data} = await axios.post(registerRoute, 
        {username, email, password, confirmPassword},
    );
    if (data.status === false) {
        toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
        localStorage.setItem(
        'user_data',
        JSON.stringify(data.user)
        );
        Router.replace("/setProfile");
    }
    
    };
}