import React from 'react'
import { connect } from 'react-redux'
import { startGetUser } from '../../actions/user'

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            email : '',
            password : ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name ] : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email : this.state.email,
            password : this.state.password
        }
        console.log(this.props)
        this.props.dispatch(startGetUser(formData, this.props))
    }

    render(){
        return (
            <div className = "container">
                <div className = "row">
                    <div className = "offset-md-3 col-md-6">
                        <form onSubmit = { this.handleSubmit }>
                        <h1>Login</h1>
                        <div className ="form-group">
                            <label htmlFor="email">email :</label>
                            <input type="email" className ="form-control" id="email" name = "email" onChange = { this.handleChange } value = { this.state.email } />  
                        </div>
                        <div className ="form-group">
                            <label htmlFor="password">password :</label>
                            <input type="password" className ="form-control" id="password" name = "password" onChange = { this.handleChange } value = { this.state.password } />  
                        </div>
                        <button type = "submit" className = "btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Login)