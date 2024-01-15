import * as yup from "yup";

export const emailValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Please Provide registered email id.")
    .email("Email is invalid!"),
});

export const signInValidationSchema = yup
  .object({
    password: yup.string().required("Please enter your password."),
    rememberMe: yup.boolean().required(),
  })
  .concat(emailValidationSchema);

export const signUpValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required").trim(),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .trim(),
  phoneNumber: yup
    .number()
    .typeError("Invalid phone number")
    .positive("Invalid phone number")
    .integer("Invalid phone number")
    .min(6000000000, "Invalid phone number")
    .max(9999999999, "Invalid phone number")
    .required("A phone number is required"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Provide a strong password"
    ),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
