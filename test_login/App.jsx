import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    {/* 메인 페이지 */}
                    <Route exact path="/" component={Home} />

                    {/* 로그인 페이지 */}
                    <Route path="/login" component={Login} />

                    {/* 회원가입 페이지 */}
                    <Route path="/signup" component={Signup} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
