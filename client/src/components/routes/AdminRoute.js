import React,{useState, useEffect} from 'react';
import {Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import {currentAdmin} from '../../functions/auth'

const AdminRoute = ({children, ...rest}) => {
    const {user} = useSelector((state) => ({...state}))
    const [ok,setOk] = useState(false)

    useEffect(()=>{
        if(user && user.token){
            currentAdmin(user.token)
            .then((res)=>{
                console.log('Current admin res', res)
                setOk(true)
            })
            .catch((err)=>{
                console.log("Admin route err", err)
                setOk(false)
            })
        }
    })

    return ok ? (
        <Route {...rest}  />
    ) : (
        <LoadingToRedirect />
    )
    
}

export default AdminRoute;
