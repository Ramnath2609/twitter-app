
const searchHashReducer = (state=[], action) => {
    switch(action.type){
        case 'HASH_TWEETS' : {
            return [...action.payload]
        }
        default : {
            return [...state]
        }
    }
}

export default searchHashReducer