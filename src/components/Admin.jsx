import React from 'react'
import {auth} from '../firebase'
import { withRouter } from 'react-router-dom'
import Firestore from './Firestore'


const Admin = (props) => {

    const [user,setUser] = React.useState(null)


    React.useEffect(()=>{
        if(auth.currentUser){
            console.log('Existe un usuario')
            setUser(auth.currentUser)
        }else{
            console.log('No existe usuario')
            props.history.push('/login')//si no existe redirige al login
        }
    },[props.history])


    return (
        <div>
            <h2>Ruta protegida</h2>
            {
                user && (
                    <Firestore user={user}></Firestore>
                )
            }
        </div>
    )
}

export default withRouter(Admin)
