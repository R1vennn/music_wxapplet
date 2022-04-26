import YBRequest from './index'

export function getSearchHot(){
    return YBRequest.get("/search/hot")
}

export function getSearchSuggest(keywords){
    return YBRequest.get("/search/suggest",{
        keywords,
        type:"mobile"
    })
}


export function getSearchResult(keywords){
    return YBRequest.get("/search",{
        keywords
    })
}