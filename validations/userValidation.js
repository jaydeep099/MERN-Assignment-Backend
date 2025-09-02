const yup = require("yup");

exports.registerUserValidate = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "Minimum 2 characters are required"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Minimum 2 characters are required"),
  email: yup.string().required("Email is required").email("email is not valid"),
});

exports.passwordValidate = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

exports.loginUserValidate = yup.object().shape({
  email: yup.string().required("Email is required").email("email is not valid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
