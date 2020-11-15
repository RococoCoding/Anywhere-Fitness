import React, {useState} from "react";
import * as yup from "yup";
import schema from "./validation/loginSchema"
import Styled from "styled-components";



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
    
    const Change = (evt) => {
        const correctValue = evt.target.value;
        const validate = () => {
            yup
            .reach(schema, evt.target.name)
            .validate(correctValue)
            .then((res) => {
                setErrors({...values, [evt.target.name] : ""})
                console.log(res)
            })
            .catch((err) => {
                setErrors({...errors,[evt.target.name] : err.message})
            })
        }
        validate()
        setValues({...values,[evt.target.name] : correctValue});
    }


    return(
        <form>
            <label>
                <StyledInput 
                type="text" 
                name="username" 
                placeholder="Username"
                value={values.username}
                onChange={Change}
                ></StyledInput>
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
            <button>Login</button>
        </form>

    );
};

export default Login;

const StyledInput = Styled.input`
  padding:10px;
  border:0;
  box-shadow:0 0 15px 5px rgba(0,0,0,0.06);
  /* margin:10px 0;  add top and bottom margin */
  width: 100%;
`