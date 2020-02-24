import React from 'react'
import { connect } from 'react-redux'
import { startSearchTweet } from '../../actions/tweet'

function HashtagTweets(props){

    if(props.searchHash.length == 0){
        props.dispatch(startSearchTweet(props.hash, props))
    }

    return (
        <div className = "container">
            <h1>Hashtag tweets</h1>
            <ul className = "list-group list-group-flush">
                {
                    props.searchHash.map(tweet => {
                        return <li className = "list-group-item" key = { tweet._id }>
                            <h4>{ tweet.user.username }</h4>
                            <p>{ tweet.body }</p>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        searchHash : state.searchHash,
        hash : props.match.params.name,
        props
    }
}

export default connect(mapStateToProps)(HashtagTweets)