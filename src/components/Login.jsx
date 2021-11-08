import React from 'react'
import {auth,db} from '../firebase'


const Login = () => {

    const[email,setEmail] = React.useState('')
    const[password,setPassword] = React.useState('')
    const[error,setError] = React.useState(null)
    const[esRegistro,setEsRegistro] = React.useState(true)


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
 
         if(esRegistro){
             registrar()
         }else{
             login()
         }
    }


    const login = React.useCallback(async()=>{
        try {
           const res = await auth.signInWithEmailAndPassword(email,password)
           console.log(res.user)
           setEmail('')
           setPassword('')
           setError(null)
        } catch (error) {
            if(error.code === "auth/invalid-email"){
                setError('email no valido')
            }
            if(error.code === "auth/user-not-found"){
                setError('Email no registrado')
            }
            if(error.code === "auth/wrong-password"){
                setError('contraseña erronea')
            }
        }
    },[email,password])



    const registrar = React.useCallback(async()=>{
        try {
           const res = await auth.createUserWithEmailAndPassword(email,password)
           await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
           })
           console.log(res.user)
           setEmail('')
           setPassword('')
           setError(null)
        } catch (error) {
            if(error.code === "auth/invalid-email"){
                setError('Email no valido')
            }
            if(error.code === "auth/email-already-in-use"){
                setError('Email ya utilizado')
            }
        }
    },[email,password])   
    
    



 
    




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