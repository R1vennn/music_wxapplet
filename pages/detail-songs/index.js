import { playerStroe, rankingStore } from "../../store/index"
import {getSongMenuDetail} from '../../api/api_music'

// pages/detail-songs/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ranking:"",
        menuInfo:{},
        type:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const type =options.type
        this.setData({type})
        if(type==="menu"){
            const id =options.id
            console.log(id)
            getSongMenuDetail(id).then(res=>{
                this.setData({menuInfo:res.playlist})
            })
        }else if(type==="rank"){
            const ranking=options.ranking
            this.setData({ranking})
            rankingStore.onState(ranking,this.getRankingDataHanlder)
        }

        
    },
    handleSongItemTwoClick:function(event){

    },

    handleSongItemClick:function(event){
        const index=event.currentTarget.dataset.index
        playerStroe.setState("playListSongs",this.data.menuInfo.tracks)
        playerStroe.setState("playListIndex",index)
    },

    onUnload:function(){
        if(this.data.ranking){
            rankingStore.offState(this.data.ranking,this.getRankingDataHanlder)
        }

       
    },

    getRankingDataHanlder:function(res){
        this.setData({rankingInfo:res})
    }
})