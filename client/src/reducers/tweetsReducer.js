const initialTweetState = []

const tweetsReducer = (state = initialTweetState, action) => {
    switch(action.type){
        case 'ADD_TWEET' : {
            return [...state, action.payload ]
        }
        case 'SET_TWEETS' : {
            return [...action.payload]
        }
        case 'DELETE_TWEET' : {
            return state.filter(tweet => tweet._id != action.payload._id)
        }
        default : {
            return [...state]
        }
    }
}

export default tweetsReducer