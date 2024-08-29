export const signedInKey = 'signedIn'
export const scoreKey = 'score'
export const login = '/login'
export const signUp = '/signUp'
export const loginTitle = 'login'
export const forgatPassword = 'Forgat Password?'
export const newMember = 'new member?'
export const SignUpTitle = 'Sign Up'
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