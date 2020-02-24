import React from 'react'
import { connect } from 'react-redux'
import TweetForm from './TweetForm'
import { startAddTweet, startSearchTweet } from '../../actions/tweet'
import SearchForm from './SearchForm'
import { startSearchUser } from '../../actions/user'
import { Link } from 'react-router-dom'
import moment from 'moment'

class Feeds extends React.Component{

     handleSubmit = (formData) => {
        this.props.dispatch(startAddTweet(formData, this.props))
    }

     handleSearch = (formData) => {
        this.props.dispatch(startSearchUser(formData, this.props))
    }

    handleHashSearch = (hash) => {
        this.props.dispatch(startSearchTweet(hash, this.props))
    }

    

    render (){
        return (
            <div className= "container-fluid">
                 <div className = "row">
                    <div className = "col-md-2 bg-light">
                        <div >
                            <h5 >{ this.props.user.username }</h5>
                            <p>{ this.props.user.email}</p>
                            { this.props.user.following && <p> Following : { this.props.user.following.length }</p>}
                            <Link to = "/profile" className="btn btn-primary">View profile</Link>
                        </div>
                    </div>
                    <div className = " col-md-6">
                    <TweetForm handleSubmit = { this.handleSubmit } />
                    <ul className = "list-group list-group-flush">
                        {
                            this.props.feeds.map(feed => {
                                if(feed.user._id == this.props.user._id){
                                    return <li key = { feed._id } className = "list-group-item">
                                            <Link to = "/profile">You</Link><br/>
                                            <span>{ feed.body}</span><br/>
                                            <span className = "text-muted">{ moment(feed.createdAt).fromNow()}</span>
                                
                            </li>
                                }
                                return <li key = { feed._id } className = "list-group-item">
                                                <Link to = {`/user/${feed.user.username}`}>{ feed.user.username }</Link><br/>
                                                <span>{ feed.body}</span><br/>
                                                <span className = "text-muted">{ moment(feed.createdAt).fromNow()}</span>
                                            
                                        </li>
                            })
                        }
                    </ul>
                   
                    </div>
                    <div className = "col-md-4">
                    <h2>Search</h2>
                    <SearchForm handleSubmit = { this.handleSearch } handleHashSubmit = { this.handleHashSearch}/> 
                    </div>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user,
        feeds : state.feeds.sort((a, b) => moment.duration(a.createdAt) - moment.duration(b.createdAt)),
        searchUser : state.searchUser
    }
}

export default connect(mapStateToProps)(Feeds)