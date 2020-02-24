import React from 'react'


class TweetForm extends React.Component{
    constructor(){
        super()
        this.state = {
            body : '',
            hashtag : ''
        } 
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            body : this.state.body,
            hashtag : this.state.hashtag.split(' ')
        }
        this.props.handleSubmit(formData)
    }

    handleChange = (e) => {
        this.setState({ [e.target.name ] : e.target.value })
    }

    render(){
        return (
            <form onSubmit = { this.handleSubmit }>
                <h2>Add a tweet</h2>
                <div className="form-group">
                    <label htmlFor="hashtag">hashtag : </label>
                    <input className = "form-control" name = "hashtag" id="hashtag" rows="3" onChange = { this.handleChange } />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Tweet :</label>
                    <textarea className = "form-control" name = "body" id="body" rows="3" onChange = { this.handleChange }></textarea>
                </div>
                <button type = "submit" className = "btn btn-primary">Add</button>
            </form>
            
            )
    }
}

export default TweetForm