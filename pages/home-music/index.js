import {playerStroe, rankingStore} from '../../store/index'

import {getBanners,getSongMenu} from '../../api/api_music'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'

const throttleQueryRect = throttle(queryRect,1000,{trailing:true})

Page({
    data: {
      banners:[],
      swiperHeight:0,
      hotSongMenu:[],
      recommendSongMenu:[],
      recommendSongs:[],

      currentSong:{},
      isPlaying:false,
      playAnimState:"paused"
    },

    onLoad: function (options) {
      this.getPageData()

      this.setupPlayerStoreListener()

    },
    //网络请求
    getPageData:function(){
      getBanners().then(res=>{
        this.setData({banners:res.banners})
      })

      getSongMenu().then(res=>{
        this.setData({hotSongMenu:res.playlists})
      })
     
     
      getSongMenu("华语").then(res => {
        this.setData({ recommendSongMenu: res.playlists })
      })

    },
    setupPlayerStoreListener:function(){
       // 发起共享数据的请求
    rankingStore.dispatch("getRankingDataAction")
   
    // 从store获取共享的数据
    rankingStore.onState("hotRanking", (res) => {
      if (!res) return
      const recommendSongs = res.slice(0,6)
      this.setData({ recommendSongs })
    })

    playerStroe.onStates(["currentSong","isPlaying"],({currentSong,isPlaying})=>{
      if(currentSong) this.setData({currentSong})
      if(isPlaying!==undefined){
        this.setData({isPlaying,playAnimState:isPlaying?"running":"paused"})
      } 
    })
    },
  

    //事件处理
    handleSearchClick:function(){
        wx.navigateTo({
          url: '/pages/detail-search/index',
        })
    },

    handleSwiperImageLoaded:function(){
      throttleQueryRect(".swiper-image").then(res=>{
        const rect=res[0]
        this.setData({swiperHeight: rect.height})
      })
    },

    handleMoreClick:function(){
      this.navigateToDetailSongsPage("hotRanking")
    },
    handleItemClick:function(event){
      const index =event.currentTarget.dataset.index
      playerStroe.setState("playListSongs",this.data.recommendSongs)
      playerStroe.setState("playListIndex",index)
    },
    handlePlayBtnClick:function(){
      playerStroe.dispatch("changeMusicPlayStatusAciton",!this.data.isPlaying)
    },
    handlePlayBarClick:function(){
      wx.navigateTo({
        url: `/pages/music-player/index?id=${this.data.currentSong.id}`,
      })
    },
    navigateToDetailSongsPage:function(rankingName){
      wx.navigateTo({
        url: `/pages/detail-songs/index?ranking=${rankingName}&type=rank`,
      })
    }
})