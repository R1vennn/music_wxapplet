import YBRequest from './index'

export function getSongDetail(ids){
    return YBRequest.get("/song/detail",{
        ids
    })
}

export function getSongLyric(id){
    return YBRequest.get("/lyric",{
        id
    })
}