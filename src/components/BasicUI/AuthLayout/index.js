import React, { Fragment } from 'react'
import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'


const AuthLayout = () => {
    const { token } = useSelector((state) => state.user)

    if (token) {
        return <Navigate to="/pos" replace={true} />
    }

    return (
        <Fragment>
            <Header />
            <Outlet />
            <Footer />
        </Fragment>
    )
}

export default AuthLayout