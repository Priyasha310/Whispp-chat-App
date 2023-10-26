import axios from "axios";
import Router  from "next/router";
import { toast } from "react-toastify";
import { loginRoute } from "./APIRoutes";

const toastOptions = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  // theme: 'dark',
};

export const handleChange = (event:any, values: any, setValues:any) => {
  event.preventDefault();
  setValues({ ...values, [event.target.name]: event.target.value });    
}

export const handleValidation = (values:any) => {
  let isValid = true;
  const {username, password} = values;
  console.log(values);

  if(!username  || !password ){ 
    toast.error('Enter required data', toastOptions);
    return false;
  }
   
  // if (isValid) toast.success('Succesfully logging in!');
  return isValid;
}

export const handleSubmit = async (e:any, values: { username: string; password: string; }, setValues:any) => {
  e.preventDefault();
  if(handleValidation(values)){
    console.log("in validation", loginRoute);
    const {username,password} = values;
    const {data} = await axios.post(
      loginRoute, 
      {username, password },
    );
    if (data.status === false) {
        toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
        localStorage.setItem(
        'user_data',
        JSON.stringify(data.user)
        );
        Router.replace("/chat");
    }
  };
}