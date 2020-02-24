import React from 'react'
import { connect } from 'react-redux'

class SearchForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            input : ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.input.includes('#')){
            const hash = this.state.input.slice(1)
            this.props.handleHashSubmit(hash)
        }else {
            const formData = {
                username : this.state.input
            }
            this.props.handleSubmit(formData, this.props)
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name ] : e.target.value })
    }

    render(){
        return (
            <form onSubmit = { this.handleSubmit }>
                <div className="form-group">
                    <label htmlFor="username"></label>
                    <input type = "text" className = "form-control" id ="input" name = "input" onChange = { this.handleChange } value = { this.state.input} />
                </div>
                <button type = "submit" className = "btn btn-primary">Search</button>
            </form>
            
            )
    }
}



export default connect()(SearchForm)