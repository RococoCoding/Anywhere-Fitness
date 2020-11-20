import * as yup from "yup";

export default yup.object().shape({
    username: yup
        .string()
        .required("Please Enter Username"),
    password: yup
        .string()
        .required("Please Enter Password"),

})