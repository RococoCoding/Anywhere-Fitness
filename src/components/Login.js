import React, {useState} from "react";
import * as yup from "yup";
import schema from "./validation/loginSchema"
import Styled from "styled-components";

import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../actions/userActions";

const initialValues = {
    username: "",
    password: "",
}

const initialErrors = {
    username: "",
    password: "",
}

const Login  = () => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);

    const { push } = useHistory();
    const dispatch = useDispatch();
    
    const Change = (evt) => {
        const correctValue = evt.target.value.trim();
        const validation = () => {
            yup
            .reach(schema, evt.target.name)
            .validate(correctValue)
            .then((res) => {
                setErrors({...errors, [evt.target.name] : ""})
                // console.log(res)
            })
            .catch((err) => {

                setErrors({...errors,[evt.target.name] : err.message})
            })
        }
        validation()
        setValues({...values,[evt.target.name] : correctValue});
    }

    const submit = (evt) => {
        evt.preventDefault();
        Axios.post(`https://bw-back-end.herokuapp.com/api/auth/login`, values)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("onboarding", "false");
                let user = {
                    name: res.data.user.name,
                    email: res.data.user.email,
                    id: res.data.user.id,
                    role: res.data.user.role,
                    username: res.data.user.username,
                }
                console.log("push to loading classes inside of axios")
                dispatch(saveUser(user)) //sets user
                push("/loading-classes");
            })
            .catch(err => console.log("error", err))
    }

    return(
        
        <ContainerDiv>
        <div className="top"></div>
        <StyledForm className="logIn-container" onSubmit={submit}>
            <h1>Log in</h1>
            <StyledLabel>
                <StyledInput 
                type="text" 
                name="username" 
                placeholder="Username"
                value={values.username}
                onChange={Change}
                ></StyledInput>
            </StyledLabel>
            {errors.username ? <div>{errors.username}</div> : ""}
            <br/>
            <StyledLabel>
                <StyledInput 
                type="password" 
                name="password" 
                placeholder="Password"
                value={values.password}
                onChange={Change}
                ></StyledInput>
            </StyledLabel>
            {errors.password ? <div>{errors.password}</div> : ""}
            <br/>
            <StyleButton id="logInBtn" >Login</StyleButton>
        </StyledForm>
        </ContainerDiv>
    );
};

export default Login;


const ContainerDiv = Styled.div`
display: flex;
flex-direction: column;
align-items: center;
/* border: solid black; */
background-color: #3F51B5;
h1 {
    font-size: 2rem;
    color: black;
}
.top {
    padding: 1%;
}
`

const StyledForm = Styled.form`
display: flex;
flex-direction: column;
align-items: center;
width: 30%;
/* height: 40%; */
background-color: white;
box-shadow:0 0 15px 5px rgba(0,0,0,0.06);
padding: 15%;
color: red;
`

const StyledLabel = Styled.label`
display: flex;
justify-content: center;
 
`

const StyledInput = Styled.input`
padding:10px;
border:0;
box-shadow:0 0 15px 5px rgba(0,0,0,0.06);
margin:10px 0px;  //add top and bottom margin
width: 100%;
font-size: 1.5rem;
`

const StyleButton = Styled.button`
/* remove default behavior */
appearance:none;
-webkit-appearance:none;

/* usual styles */
padding:15px;
border:none;
background-color:#3F51B5;
color:#fff;
font-weight:600;
border-radius:7px;
width:40%;

`
