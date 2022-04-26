import YBRequest from './index'

//获取视频列表
export function getTopMV(offset,limit=10){
    return YBRequest.get("/top/mv",{
        offset,
        limit
    })
}

//获取播放地址
export function getMVURL(id){
    return YBRequest.get("/mv/url",{
        id
    })
}

//获取视频详情
export function getMVDetail(mvid){
    return YBRequest.get("/mv/detail",{
        mvid
    })
}

//获取视频相关信息
export function getRelatedMV(id){
    return YBRequest.get("/related/allvideo",{
        id
    })
}