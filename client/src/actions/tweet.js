import axios from "../config/axios"
import Swal from 'sweetalert2'

export const setTweets = (tweets) => {
    return {
        type : 'SET_TWEETS',
        payload : tweets
    }
}

export const addTweet = (tweet) => {
    return {
        type : 'ADD_TWEET',
        payload : tweet
    }
}

export const deleteTweet = (tweet) => {
    return {
        type : 'DELETE_TWEET',
        payload : tweet
    }
}

export const searchHashTweet = (tweets) => {
    return {
        type : 'HASH_TWEETS',
        payload : tweets
    }
}

export const startAddTweet = (formData, props) => {
    return dispatch => {
        axios.post('/tweets', formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            if(response.data.errors){
                alert('something is wrong')
            }
            const tweet = response.data
            dispatch(addTweet(tweet))
            Swal.fire('Good job', 'Your tweet has been posted', 'success')
            props.history.push('/profile')
        })
        .catch(err => {
            alert(err)
        })
    }
}

export const startDeleteTweet = (id) => {
    return dispatch => {
        axios.delete(`/tweets/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            if(response.data.errors){
                alert('something is wrong')
            }
            const tweet = response.data
            dispatch(deleteTweet(tweet))
        })
        .catch(err => {
            alert(err)
        })
    }
}


export const startSearchTweet = (hash, props) => {
    console.log(hash)
    return dispatch => {
        axios.get(`/search/tweets?hashtag=${hash}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
            .then(response => {
                if(response.data.errors){
                    alert('something wrong')
                }
                dispatch(searchHashTweet(response.data))
                props.history.push(`/hashtag/${hash}`)

            })
            .catch(err => {
                alert(err)
            })
    }
}
