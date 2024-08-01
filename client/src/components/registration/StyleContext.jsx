import React, { createContext, useContext } from 'react'

const StyleContext = createContext()

export const useStyle = () => useContext(StyleContext)

export const StyleProvider = ({ children }) => {
    const style = {
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
                  '-webkit-box-shadow': '0 0 0 1000px black inset', 
                  '-webkit-text-fill-color': 'white',
            }
        },
    }

  return (
    <StyleContext.Provider value={ style }>
      { children }
    </StyleContext.Provider>
  )
}
