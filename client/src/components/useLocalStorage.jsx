
export function useLocalStorage() {
    
    const setItem = (value) => {
      try{
        window.localStorage.setItem('score', JSON.stringify(value))
      }catch(error){
        console.log(error)
      }
    }

    const getItem = () => {
      try{
        const item = window.localStorage.getItem('score')
        return item && JSON.parse(item)
      }catch(error){
        console.log(error)
      }
    }

    const removeItem = (value) => {
      try{
          window.localStorage.removeItem('score')
        }catch(error){
          console.log(error)
        }
    }

    return { setItem, getItem, removeItem }
}
