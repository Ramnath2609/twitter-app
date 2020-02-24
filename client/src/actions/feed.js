

export const setFeeds = (tweets) => {
    return {
        type : 'SET_FEEDS',
        payload : tweets
    }
}

export const addFeed = (tweet) => {
    return {
        type : 'ADD_FEED',
        payload : tweet
    }
}