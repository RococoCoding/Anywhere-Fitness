import * as yup from "yup";

export default yup.object().shape({
    name: yup
        .string()
        .required("Please Enter Name"),
    username: yup
        .string()
        .required("Please Enter Username"),
    password: yup
        .string()
        .required("Please Enter Password"),
    email: yup
        .string()
        .email("must be valid email address")
        .required("Please Enter Email"),
    role: yup
        .string()
        .oneOf(["instructor", "client"], "Please Select a Role"),

})