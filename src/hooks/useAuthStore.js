import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"
import { onLogoutCalendar } from "../store/calendar/calendarSlice"

export const useAuthStore = () => { 

    const dispatch = useDispatch()
    const {status, user, errorMessage} = useSelector( state => state.auth )

    const startLogin = async(email,password) => {
        dispatch( onChecking() )
        console.log({email,password})

        try{
            const {data} = await calendarApi.post('/auth', {email,password})
            console.log(data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch( onLogin({uid: data.uid, name: data.name}) )
        }
        catch(err){
            dispatch( onLogout('credenciales incorrectas'))
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10)

            
        }
    }
    
    const startRegister = async(email,password,name) => {
        dispatch( onChecking() )
        console.log({name,email,password})
        
        try {
            const {data} = await calendarApi.post('/auth/new', {name,email,password})
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch( onLogin({uid: data.uid, name: data.name}) )
        } catch (e) {
           dispatch( onLogout( e.response.data?.msg || 'Hace falta el nombre, el email o la contraseña') )
              setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10)
            
            
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token')
        if(!token){
            return dispatch( onLogout() )    
        }
        try {
            const { data } = await calendarApi.get('/auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch( onLogin({uid: data.uid, name: data.name}) )
        } catch (error) {
            localStorage.clear()
            dispatch( onLogout() )
        }
    }

    const startLogout = () => {
        localStorage.clear()
        dispatch( onLogout() )
        dispatch( onLogoutCalendar())
    }

    return {
        status,
        user,
        errorMessage,


        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}