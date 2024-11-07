export const signedInKey = 'signedIn'
export const scoreKey = 'score'
export const login = '/login'
export const signUp = '/signUp'
export const resetPassword = '/resetPassword'
export const verifyCode = '/verifyCode'
export const loginTitle = 'Login'
export const resetPasswordConfirm = '/resetPasswordConfirm'
export const forgatPassword = 'Forgat Password?'
export const newMember = 'new member?'
export const signUpTitle = 'Sign Up'
export const password = 'password'
export const passwordRequired = 'Password is required'
export const minLenMessage = 'Min 8 characters'
export const numberRequired = 'Min one number 0-9'
export const username = 'username'
export const usernameRequired = 'Usernam is required'
export const usernameTaken = 'Username already taken'
export const email = 'email'
export const emailRequired = 'Email is required'
export const emailTaken = 'Email already taken'
export const incorrectMessage = 'incorrect password or username'
export const errAlert = 'Something went wrong! Please try again.'
export const resetPasswordTitle = 'Reset Password' 
export const sendTitle = 'Send'
export const incorrectEmail = 'Incorrect email'
export const verifyCodeTitle = 'Verify Code'
export const minCodeLen = 'Min 8 nimbers'
export const codeRequired = 'Code is required'
export const incorrectCode = 'Invalid or expired code'
export const FailedAlert = 'Failed to reset password, try again'
export const MUIstyle = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiInputBase-input': {
        color: 'white',
        backgroundColor: 'black',
        '::placeholder': {
          color: 'white',
          opacity: 1,
        },
        '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 1000px black inset', 
              WebkitTextFillColor: 'white',
        }
    },
}