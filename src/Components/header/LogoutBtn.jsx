import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logOut } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logOutHandler = () => {
        authService.logOut().then(() => dispatch(logOut)).catch((err) => console.log(err))

    }
    return (
        <button
            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logOutHandler}
        >Logout</button>
    )
}

export default LogoutBtn