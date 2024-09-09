import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// 토큰 유무로 인증 확인
const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

export default PrivateRoute;
