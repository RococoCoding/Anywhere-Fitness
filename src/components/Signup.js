

import React, {useState} from "react";
import { Link, Route } from "react-router-dom";
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
            console.log(res)
            dispatch(addUser(newUser));
            setValues(initialValues);
            push("/");
        })
        .catch((err) => {
            console.log(err)
            debugger;
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
        <form className="signUp-conatiner" onSubmit={submit}>
            <label>
                <input 
                type="text" 
                name="name" 
                placeholder="name"
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
                placeholder="password"
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
                placeholder="email"
                value={values.email}
                onChange={Change}
                ></input>
            </label>
            {errors.email ? <div>{errors.email}</div> : ""}
            <br/>
            <label>
                <select name="role" type="role" value={values.role} onChange={Change}>
                <option >---Select Role---</option>
                    <option type="role" value="instructor">Instructor</option>
                    <option type="role" value="client">Client</option>  
                </select>
            </label>
            {errors.role ? <div>{errors.role}</div> : ""}
            <br/>
            <button className="signUpBtn">Sign Up</button>
        </form>

    );
};

export default SignUp;

