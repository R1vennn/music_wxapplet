import YBRequest from './index'

export function getBanners(){
    return YBRequest.get("/banner",{
        type:2
    })
}

export function getRankings() {
    return YBRequest.get("/personalized/newsong")
  }

  export function getSongMenu(cat="全部",limit=6,offset=0){
      return YBRequest.get("/top/playlist",{
          cat,
          limit,
          offset
      })
  }

  export function getSongMenuDetail(id){
      return YBRequest.get("/playlist/detail",{
          id
      })
  }