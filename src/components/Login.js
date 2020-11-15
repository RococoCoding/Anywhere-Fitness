import React, {useState} from "react";


const initialValues = {
    username: "",
    password: "",
}

const Login  = () => {
    const[values, setValues] = useState(initialValues);
    
    const onchange = (evt) => {
        const correctValue = evt.target.value;
        setValues({...values,[evt.target.name] : correctValue})
    }


    return(
        <form>
            <label>
                <input 
                type="text" 
                name="username" 
                placeholder="Username"
                value={values.username}
                onChange={onchange}
                ></input>
            </label>
            <br/>
            <label>
                <input 
                type="password" 
                name="password" 
                placeholder="Password"
                value={values.password}
                onChange={onchange}
                ></input>
            </label>
            <br/>
            <button>Login</button>
        </form>


    );
};

export default Login;