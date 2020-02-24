import React from 'react'
import { connect } from 'react-redux'
import { startDeleteTweet } from '../../actions/tweet'
import moment from 'moment'

function Profile(props){

    const handleClick = (id) => {
        props.dispatch(startDeleteTweet(id))
    }

    const tweets = props.tweets.sort((a,b) => moment.duration(a.createdAt) - moment(b.createdAt))

    return (
        
        <div>
            <div className= "container-fluid">
                 <div className = "row">
                    <div className = "col-md-2 bg-light">
                            <h5>{ props.user.username }</h5>
                            <p>{ props.user.email}</p>
                            { props.user.following && <p> Following : { props.user.following.length }</p>}
                    </div>
                    <div className = " col-md-6">
                        <h4>Your tweets</h4>
                    <ul className = "list-group list-group-flush">
                        {
                            tweets.map(tweet => {
                                return <li key = {tweet._id} className = "list-group-item">
                                                <h5 >{ props.user.username }</h5>
                                                <span>{ tweet.body}</span>
                                                <p className = "text-muted">{moment(tweet.createdAt).fromNow()}</p>
                                                <button className = "btn btn-danger btn-sm" onClick = {() => { handleClick(tweet._id) }}>Delete</button>
                                            
                                        </li>
                            })
                        }
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        user : state.user,
        tweets : state.tweets
    }
}

export default connect(mapStateToProps)(Profile)