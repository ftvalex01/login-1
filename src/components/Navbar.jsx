import React from 'react'
import {Link,NavLink} from 'react-router-dom'
const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">AUTH</Link>
            <div className="d-flex">
                <NavLink className="btn btn-dark mx-2" to="/" exact>
                    inicio
                </NavLink>
                <NavLink className="btn btn-dark mx-2" to="/admin">
                    admin
                </NavLink>
                <NavLink className="btn btn-dark mx-2" to="/login">
                    login
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar
