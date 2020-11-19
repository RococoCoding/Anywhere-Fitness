import * as yup from 'yup'

const date = new Date();

export default yup.object().shape({
    name: yup
    .string()
    .min(1,'Please name your new class.'),
    instructor_name: yup
    .string()
    .required('Please enter the instructors name.'),
    type: yup
    .string()
    .min(1,'Please select the type of class this will be.'),
    date: yup
    .date()
    .required('Please Select a date for the class.')
    .nullable()
     .min(date,'Please select a valid date.')
    ,
    start_time: yup
    .string()
    .required('Please pick a start time for the class.'),
    duration: yup
    .string()
    .required('Please select the duration of the class'),
    intensity: yup
    .string()
    .required('Please select the intensity of the class'),
    location: yup
    .string()
    .required('Please enter the location of the class'),
    number_attendees: yup
    .number(),
    max_size: yup
    .number()
    .positive('Class size must be greater than 0'),
})