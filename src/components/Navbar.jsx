import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import { auth } from '../firebase'
import { withRouter } from 'react-router'



const Navbar = (props) => {

    const cerrarSesion = () =>{
        auth.signOut()
        .then(()=>{
            props.history.push('/home')
        })
       
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">AUTH</Link>
            <div className="d-flex">
                <NavLink className="btn btn-dark mx-2" to="/" exact>
                    inicio
                </NavLink>
                {
                    props.firebaseUser !== null ? (
                    <NavLink className="btn btn-dark mx-2" to="/admin">
                        admin
                    </NavLink>

                    ): null
                }
                {
                    props.firebaseUser !== null ? (
                        <button className="btn btn-dark" onClick={()=>cerrarSesion()}>Cerrar sesion</button>
                    ) : (
                        <NavLink className="btn btn-dark mx-2" to="/login">
                            login
                        </NavLink>

                    )
                }
            </div>
        </div>
    )
}

export default withRouter(Navbar)
