import React from 'react'
import { connect } from 'react-redux'
import { startEditUser, startSearchUser } from '../../actions/user'
import moment from 'moment'

function SearchUser(props){

    if(Object.keys(props.searchUser).length == 0){
        const formData = {
            username : props.username
        }
        props.dispatch(startSearchUser(formData, props.redirect))
    }

    
    const handleClick = (id) => {
        console.log(id)
        const user = props.user
        user.following.push(id)
        props.dispatch(startEditUser(user))
    }

    return (
        <div className = "container-fluid">
            <div className = "row">
                    {
                        Object.keys(props.searchUser).length != 0 &&  
                        <div className = "col-md-2 card text-white bg-secondary mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{ props.searchUser.username }</h5>
                                <p className="card-text">{ props.searchUser.email}</p>
                                { props.searchUser.following && <p className = "card-text"> Following : { props.searchUser.following.length }</p>}
                                {!props.user.following.includes(props.searchUser._id) && <button onClick = {() => { handleClick(props.searchUser._id) }}>Follow</button> }
                            </div>
                        </div>
                    }
                    {
                        Object.keys(props.searchUser).length != 0 &&
                        <div className = "offset-md-1 col-md-6">
                        <h2>{ props.searchUser.username} tweets</h2>
                        <ul className = "list-group list-group-flush">
                            {
                                props.searchUser.tweets.map(tweet => {
                                    return <li className = "list-group-item" key = {tweet._id}>
                                        <h5>{ props.searchUser.username }</h5>
                                        <span>{tweet.body}</span>
                                        <p>{ moment(tweet.createdAt).fromNow()}</p>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    }
                      
                    
                </div>
           
        </div>
            
    )
}

const mapStateToProps = (state, props) => {
    return {
        redirect : props,
        username : props.match.params.name,
        searchUser : state.searchUser,
        user : state.user
    }
}

export default connect(mapStateToProps)(SearchUser)