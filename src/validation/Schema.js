import * as yup from 'yup'


export default yup.object().shape({
    name: yup
    .string(),
    type: yup
    .string()
    .min(1,'please pick a type of class'),
    startTime: yup
    .string(),
    duration: yup
    .string(),
    intensityLevel: yup
    .string(),
    location: yup
    .string(),
    CurrentRegisteredAttendees: yup
    .number(),
    maxClassSize: yup
    .number(),
  
})