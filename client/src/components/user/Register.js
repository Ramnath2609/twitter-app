import React from 'react'
import axios from '../../config/axios'

class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            email : '',
            password : '',
            mobile : '',
            username : ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name ] : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username : this.state.username,
            mobile : this.state.mobile,
            email : this.state.email,
            password : this.state.password
        }
        axios.post('/user/register', formData)
            .then(response => {
                if(response.data._id){
                    this.props.history.push('/login')
                }
            })
            .catch(err => {
                alert(err)
            })

    }

    render(){
        return (
            <div className = "container">
                <div className = "row">
                    <div className = "offset-md-3 col-md-6">
                        <form onSubmit = { this.handleSubmit }>
                        <h1>Register with us !</h1>
                        <div className ="form-group">
                            <label htmlFor="username">username :</label>
                            <input type="text" className ="form-control" id="username" name = "username" onChange = { this.handleChange } value = { this.state.username } />  
                        </div>
                        <div className ="form-group">
                            <label htmlFor="email">email :</label>
                            <input type="text" className ="form-control" id="email" name = "email" onChange = { this.handleChange } value = { this.state.email } />  
                        </div>
                        <div className ="form-group">
                            <label htmlFor="mobile">mobile :</label>
                            <input type="text" className ="form-control" id="mobile" name = "mobile" onChange = { this.handleChange } value = { this.state.mobile } />  
                        </div>
                        <div className ="form-group">
                            <label htmlFor="password">password :</label>
                            <input type="password" className ="form-control" id="password" name = "password" onChange = { this.handleChange } value = { this.state.password } />  
                        </div>
                        <button type = "submit" className = "btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register