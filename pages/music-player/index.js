    import {audioContext,playerStroe} from '../../store/index'

    const playModeNames=["order","repeat","random"]

Page({

    data: {
        id:0,
        currentSong:{},
        lyricInfos:[],
        durationTime:0,
        currentTime:0,
        currentLyricText:"",
        currentLyricIndex:0,

        playModeIndex:0,
        playModeName:"order",
        isPlaying:false,
        playingName:"pause",

        currentPage: 0,
        isMusicLyric:true,
        contentHeight: 0,
        sliderValue:0,
        isSilderChanging:false,
        lyricScrollTop:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const id =options.id
        this.setData({id})

        this.setupPlayerStoreListener()

        const screenHeight=getApp().globalData.screenHeight
        const statusBarHeight=getApp().globalData.statusBarHeight
        const navBarHeight=getApp().globalData.navBarHeight
        const contentHeight =screenHeight-statusBarHeight-navBarHeight
        const deviceRadio=getApp().globalData.deviceRadio
        this.setData({contentHeight,isMusicLyric:deviceRadio>=2})


        // this.setupAudioContextListenner()
         
    },


// 事件处理
    handleSwiperChange:function(event){
            const current =event.detail.current
            this.setData({currentPage:current})
    },

    handleSliderChange:function(event){
        const value =event.detail.value

        const currentTime= this.data.durationTime*value/100

        // audioContext.pause()
        audioContext.seek(currentTime/1000)

        this.setData({sliderValue:value,isSilderChanging:false})

    },
    handleSilderChanging:function(event){
        const value =event.detail.value
        const currentTime=this.data.durationTime*value/100
        this.setData({isSilderChanging:true,currentTime})
    },
    handleBackClick:function(){
        wx.navigateBack()
    },
    handleModeBtnClick:function(){
        let playModeIndex =this.data.playModeIndex+1
        if(playModeIndex===3) playModeIndex=0
        playerStroe.setState("playModeIndex",playModeIndex)
    },
    handlePlayBtnClick:function(){
        playerStroe.dispatch("changeMusicPlayStatusAciton")
    },

    //上一首
    handlePrevBtnClick:function(){
        playerStroe.dispatch("changeNewMusicAction",false)
    },

    //下一首
    handleNextBtnClick:function(){
        playerStroe.dispatch("changeNewMusicAction")
    },


    //数据监听
    setupPlayerStoreListener:function(){
        playerStroe.onStates(["currentSong","durationTime","lyricInfos"],({
            currentSong,
            durationTime,
            lyricInfos
        })=>{
            if(currentSong)this.setData({currentSong})
            if(durationTime)this.setData({durationTime})
            if(lyricInfos)this.setData({lyricInfos})
        })

        playerStroe.onStates(["currentTime","currentLyricIndex","currentLyricText"],({
            currentTime,
            currentLyricIndex,
            currentLyricText
        })=>{
            //时间变化
            if (currentTime && !this.data.isSliderChanging) {
                const sliderValue = currentTime / this.data.durationTime * 100
                this.setData({ currentTime, sliderValue })
              }
            //歌词变化
            if(currentLyricIndex){
                this.setData({currentLyricIndex,lyricScrollTop:currentLyricIndex*35})
            }
            if(currentLyricText){
                this.setData({currentLyricText})
            }
        })

        //监听播放模式
        playerStroe.onStates(["playModeIndex","isPlaying"],({playModeIndex,isPlaying})=>{
            if(playModeIndex!==undefined){
                this.setData({playModeIndex,playModeName:playModeNames[playModeIndex]})
            }
           if(isPlaying!==undefined){
               this.setData({isPlaying,playingName:isPlaying?"pause":"resume"})
           }
        })
    },

    onUnload:function(){

    }
})