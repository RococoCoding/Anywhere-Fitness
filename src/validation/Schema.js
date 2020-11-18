import * as yup from 'yup'


export default yup.object().shape({
    name: yup
    .string(),
    instructor_name: yup
    .string(),
    type: yup
    .string()
    .min(1,'please pick a type of class'),
    date: yup
    .string(),
    start_time: yup
    .string(),
    duration: yup
    .string(),
    intensity: yup
    .string(),
    location: yup
    .string(),
    number_attendees: yup
    .number(),
    max_size: yup
    .string(),
})