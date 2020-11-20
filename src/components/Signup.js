

import React, {useState} from "react";
import axios from "axios";
import * as yup from "yup";
import schema from "./validation/signUpSchema";
import Styled from "styled-components";
import { addUser } from "../actions/userActions";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";


const initialValues = {
    name: "",
    username: "",
    password: "",
    email: "",
    role: "",
    signedup: false,
}

const initialErrors = {
    name: "",
    username: "",
    password: "",
    email: "",
    role: "",
}




const SignUp = () => {
    const[values, setValues] = useState(initialValues);
    const[errors, setErrors] = useState(initialErrors);
    const dispatch = useDispatch();
    const {push} = useHistory();
    
    const Change = (evt) => {
        const correctValue = evt.target.type === "checkbox" ? evt.target.checked :
        evt.target.value;
        const validation = () => {
            yup
            .reach(schema, evt.target.name)
            .validate(correctValue)
            .then((res) => {
                setErrors({...errors, [evt.target.name] : ""})
                // console.log(res)
            })
            .catch((err) => {
                console.log(err)
                setErrors({...errors,[evt.target.name] : err.message})
            })
        }
        validation()
        setValues({...values,[evt.target.name] : correctValue})
    };

    const postNewUser = (newUser) => {
        axios
        .post("https://bw-back-end.herokuapp.com/api/auth/register", newUser)
        .then((res) => {
            setValues(initialValues);
            push("/registered");
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const submit = (evt) => {
        evt.preventDefault();
        const newUser = {
            name: values.name.trim(),
            username: values.username.trim(),
            password: values.password.trim(),
            email: values.email.trim(),
            role: values.role.trim(),
        }
        postNewUser(newUser)
        console.log(newUser)
    }

    return(
        <ContainerDiv className="signUp-conatiner">
        <div className="top"></div>
        <form onSubmit={submit}>
        <h1>Create Account</h1>
            <label>
                <input 
                type="text" 
                name="name" 
                placeholder="Name"
                value={values.name}
                onChange={Change}
                ></input>
            </label>
             {errors.name ? <div>{errors.name}</div> : ""}
            <br/>
            <label>
                <input 
                type="text" 
                name="username" 
                placeholder="Username"
                value={values.username}
                onChange={Change}
                ></input>
            </label>
            {errors.username ? <div>{errors.username}</div> : ""}
            <br/>
            <label>
                <input 
                type="password" 
                name="password" 
                placeholder="Password"
                value={values.password}
                onChange={Change}
                ></input>
            </label>
            {errors.password ? <div>{errors.password}</div> : ""}
            <br/>
            <label>
                <input 
                type="email" 
                name="email" 
                placeholder="Email"
                value={values.email}
                onChange={Change}
                ></input>
            </label>
            {errors.email ? <div>{errors.email}</div> : ""}
            <br/>
            <label className="Role">
                <select name="role" type="role" value={values.role} onChange={Change}>
                <option >---Select Role---</option>
                    <option type="role" value="instructor">  Instructor</option>
                    <option type="role" value="client">Client</option>  
                </select>
            </label>
            {errors.role ? <div>{errors.role}</div> : ""}
            <br/>
            <button className="signUpBtn">Sign Up</button>
        </form>
        <div className="footer"></div>
        </ContainerDiv>
    );
};

export default SignUp;


const ContainerDiv = Styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-color: #3F51B5;

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    box-shadow:0 0 20px 10px rgba(0,0,0,0.10);
    padding: 12%;
    background-color: #fff;
    color: red;
};
h1 {
    font-size: 3rem;
    font-weight: bold;
    color: black;
    margin-bottom: 15%;
    margin-top: -30%
}
label{
    display: flex;
    justify-content: center;
}
input {
    padding:10px;
    border:0;
    box-shadow:0 0 15px 5px rgba(0,0,0,0.06);
    margin:10px 0px;  //add top and bottom margin
    width: 100%;
    font-size: 1.5rem;
}
button {
    appearance:none;
    -webkit-appearance:none;
    padding:15px;
    border: solid #3F51B5;
    background-color:#3F51B5;
    color:#fff;
    font-weight:600;
    border-radius:7px;
    width:40%;
    margin-top: 5%;
    margin-bottom: -5%;
    transition: 0.5s;
    font-size: 1.2rem;
}
button:hover {
    cursor: pointer;
    background-color: #fff;
    color: #3F51B5;
    
}
select {
    display: flex;
    justify-content: center;
    /* border: solid black; */
    padding: 10px;
    width: 100%;
    border: 0;
    box-shadow:0 0 15px 5px rgba(0,0,0,0.06);
    margin:10px 0px;  //add top and bottom margin
    font-size: 1.2rem;
    cursor: pointer;
    /* -webkit-appearance: none;  */
    /* -moz-appearance: none;  */
    /* -ms-appearance: none;  */
    /* appearance: none;  */
}
div {
    padding:1%;
    width: 52%;
}

`