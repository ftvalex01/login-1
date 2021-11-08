import React from 'react'
import {auth} from '../firebase'

const Login = () => {

    const[email,setEmail] = React.useState('')
    const[password,setPassword] = React.useState('')
    const[error,setError] = React.useState(null)
    const[esRegistro,setEsRegistro] = React.useState(true)



    const registrar = React.useCallback(async()=>{
        try {
           const res = await auth.createUserWithEmailAndPassword(email,password)
           console.log(res.user)
        } catch (error) {
            if(error.code === "auth/invalid-email"){
                setError('Email no valido')
            }
            if(error.code === "auth/email-already-in-use"){
                setError('Email ya utilizado')
            }
        }
    },[email,password])    


   const procesarDatos = (e) =>{
       e.preventDefault()
       if(!email.trim()){
           setError('Ingrese email')
           return
       }
       if(!password.trim()){
        setError('Ingrese password')
        return
    }
        if(password.length < 6){ //en firebase la contraseña tiene que tener minimo 6 caracteres.
         setError('La contraseña tiene que tener minimo 6 caracteres')
         return
        }

        setError(null)//para quitar el mensaje de error
        console.log('Pasando todas las validaciones')

        if(setEsRegistro){
            registrar()
        }
   }





    return (
        <div className="mt-5">
            <h3 className="text-center">
            {
                esRegistro ? 'Registro de Usuarios' : 'Login de acceso'
            }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-x1-4">
                    <form onSubmit={procesarDatos}>
                    {
                        error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )//si existe error pinta mensaje
                    }
                        <input 
                        type="email" 
                        className="form-control mb-2" 
                        placeholder="Ingrese tu email"
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        />
                         <input 
                        type="password" 
                        className="form-control mb-2" 
                        placeholder="Ingrese tu password"
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                        />
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                            {
                                esRegistro ? 'Registrarse' : 'Acceder'
                            }
                        </button>
                        <button className="btn btn-info btn-sm btn-block mx-2" onClick={()=>setEsRegistro(!esRegistro)} type="button">
                          {
                              esRegistro ? '¿ya tienes cuenta?' : '¿no tienes cuenta?'
                          }
                        </button>
                    </form>
                </div>
            </div>  
        </div>
    )
}

export default Login
