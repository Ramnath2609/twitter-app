import React from 'react'
import Login from './components/user/Login'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Register from './components/user/Register'
import Home from './Home'
import { connect } from 'react-redux'
import { startRemoveUser } from './actions/user'
import Feeds from './components/user/Feeds'
import SearchUser from './components/user/SearchUser'
import Profile from './components/user/Profile'
import HashtagTweets from './components/user/HashtagTweets'
import Analytics from './components/user/Analytics'

function App(props){
    const handleLogout = () => {
        props.dispatch(startRemoveUser())
    }

    return (
        <BrowserRouter>
                <div>
                    { Object.keys(props.user).length == 0 ? (
                        <div>
                             <nav className ="navbar navbar-expand-lg navbar-dark bg-dark">
                                <a className="navbar-brand" href="/">Tweetter</a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
        
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link className = "nav-link" to = "/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className = "nav-link" to = "/register">Register</Link>
                                    </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        
                        
                    ) : (
                        <div>
                             <nav className ="navbar navbar-expand-lg navbar-dark bg-dark">
                                <a className="navbar-brand" href="/home">Tweetter</a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link className = "nav-link" to = "/profile">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className = "nav-link" to = "/analytics" >Analytics</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className = "nav-link" to = "/logout" onClick = { handleLogout }>Logout</Link>
                                    </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                       
                    )}
                   
                </div>

            <Route exact path = "/" component = { Home } />
            <Route path = "/home" component = { Feeds } />
            <Route path = "/login" component = { Login } />
            <Route path = "/register" component = { Register } />
            <Route path = "/user/:name" component = { SearchUser } />
            <Route path = "/profile" component = { Profile } />
            <Route path = "/hashtag/:name" component = { HashtagTweets } />
            <Route path = "/analytics" component = { Analytics} />
        </BrowserRouter>
        
    )
}

const mapStateToProps = (state, props) => {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(App)