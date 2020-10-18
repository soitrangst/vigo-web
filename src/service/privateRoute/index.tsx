import React from 'react'
import {Redirect, Route, RouteProps} from 'react-router'

interface IPrivateRouteProps extends RouteProps {
  redirectPath: string 
}

  const PrivateRoute: React.FC<IPrivateRouteProps> = (props:IPrivateRouteProps) => {
    const isAuthenticate = localStorage.getItem('auth')
   return isAuthenticate ? (
    <Route {...props} component={props.component} render={undefined} />
  ) : (
    <Redirect to={{pathname: props.redirectPath}} />
  )
}

export default PrivateRoute