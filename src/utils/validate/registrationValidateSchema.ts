import * as yup from 'yup'


export default [
 
  yup.object({
    nickname:yup.string().required('Nickname is required field').trim(),
    email: yup.string().required('Email is required field').email('Invalid email address'),
    password: yup
      .string()
      .required('Password is required field')
      .min(6, 'Password must contain at least six characters')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        'Password must contain a letter, a number and one special character'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Password must match')
      .required('Confirm password is required')
  })
]
