const initialSearchUser = {}

const searchUserReducer = (state=initialSearchUser, action) => {
    switch(action.type){
        case 'SET_SEARCH_USER' : {
            return { ...action.payload }
        }
        default : {
            return {...state}
        }
    }
}

export default searchUserReducer