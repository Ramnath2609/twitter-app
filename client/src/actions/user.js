import axios from '../config/axios'
import { setTweets } from './tweet'
import { setFeeds } from './feed'
import Swal from 'sweetalert2'

export const setUser = (user) => {
    return {
        type : 'SET_USER',
        payload : user
    }
}

export const editUser = (user) => {
    return {
        type : 'EDIT_USER',
        payload : user
    }
}

export const searchUser = (user) => {
    return {
        type : 'SET_SEARCH_USER',
        payload : user
    }
}

export const removeUser = () => {
    return {
        type : 'REMOVE_USER',
    } 
}


export const startGetUser = (formData, props) => {
    return dispatch => {
        axios.post('/user/login', formData)
            .then(response => {
                console.log(response)
                if(response.data.error){
                    Swal.fire('Oops !','Invalid email or password', 'error')
                }else{
                    const { user, token } = response.data
                    dispatch(setUser(user))
                    localStorage.setItem('authToken', token)
                    const req1 = axios.get('/tweets', {
                        headers : {
                            'x-auth' : localStorage.getItem('authToken')
                        }
                    })
                    const req2 = axios.get('/feeds', {
                        headers : {
                            'x-auth' : localStorage.getItem('authToken')
                        }
                    })
                    Promise.all([req1, req2])
                        .then(responses => {
                            dispatch(setTweets(responses[0].data))
                            dispatch(setFeeds(responses[1].data))
                            props.history.push("/home")
                            Swal.fire('Good job !', 'Successfully logged in', 'success')
                        })
                }
                })
                
                .catch(err => {
                    alert(err)
                })
    }
}

export const startSetUser = () => {
    return dispatch => {
        axios.get('/account', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            if(response.data.errors){
                alert('something went wrong')
            }
            const user = response.data
            dispatch(setUser(user))
            
            const req1 = axios.get('/tweets', {
                headers : {
                    'x-auth' : localStorage.getItem('authToken')
                }
            })
            const req2 = axios.get('/feeds', {
                headers : {
                    'x-auth' : localStorage.getItem('authToken')
                }
            })
            return Promise.all([req1, req2])
        })
        .then(responses => {
            dispatch(setTweets(responses[0].data))
            dispatch(setFeeds(responses[1].data))
        })
    }
}

export const startEditUser = (user) => {
    return dispatch => {
        axios.put('/follow', user, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const user = response.data
            dispatch(editUser(user))
            window.location.reload()
        })
    }
}


export const startRemoveUser = (redirect) => {
    return dispatch => {
        axios.delete('/logout', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
                localStorage.removeItem('authToken')
                dispatch(removeUser())
                Swal.fire('Good job !', 'Successfully logged out', 'success')
        })
    }
}



export const startSearchUser = (formData, props) => {
    console.log(formData)
    return dispatch => {
        axios.get(`/user/${formData.username}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            if(response.data.notice){
                alert('user not found')
                props.history.push('/home')
            }else {
                console.log(response.data)
                const {user, tweets } = response.data
                user.tweets = tweets
                dispatch(searchUser(user))
                props.history.push(`/user/${user.username}`)
            }
           
        })
        .catch(err => {
            alert(err)
        })
    }
}
