import {HYEventStore} from 'hy-event-store'
import {getSongDetail,getSongLyric} from '../api/api_player'
import {parseLyric} from '../utils/parse-lyric'

// const audioContext=wx.createInnerAudioContext()
const audioContext=wx.getBackgroundAudioManager()

const playerStroe=new HYEventStore({
    state:{
        isFirstPlay:true,
        isStoping:false,

        id:0,
        currentSong:{},
        durationTime:0,
        lyricInfos:[],

        currentTime:0,
        currentLyricText:"",
        currentLyricIndex:0,

        isPlaying:false,

        playModeIndex:0,//0:循环播放  1:单曲播放 2:随机播放
        playListSongs:[],
        playListIndex:0,
    },
    actions:{
        playMusicWithSongIdAction(ctx,{id,isRefresh=false}){
            if(ctx.id==id&&!isRefresh){
                this.dispatch("changeMusicPlayStatusAciton",true)
                return
            } 
            ctx.id=id

            ctx.isPlaying=true
            ctx.currentSong={}
            ctx.durationTime=0
            ctx.lyricString=[]
            ctx.currentTime=0
            ctx.currentLyricIndex=0
            ctx.currentLyricText=""


            getSongDetail(id).then(res=>{
                ctx.currentSong=res.songs[0]
                ctx.durationTime=res.songs[0].dt
                audioContext.title=res.songs[0].name
            })
            getSongLyric(id).then(res=>{
               const lyricString=res.lrc.lyric
               const lyrics=parseLyric(lyricString)
               ctx.lyricInfos=lyrics
            })

         audioContext.stop()
         audioContext.src=`https://music.163.com/song/media/outer/url?id=${id}.mp3`
         audioContext.title=id
         audioContext.autoplay=true

         if(ctx.isFirstPlay){
            this.dispatch("setupAudioContextListenerAciton")
            ctx.isFirstPlay=false
         }
         
        },
        setupAudioContextListenerAciton(ctx){
            audioContext.onCanplay(()=>{
                audioContext.play()
             })
             audioContext.onTimeUpdate(()=>{
                const currentTime= audioContext.currentTime*1000
           
                ctx.currentTime=currentTime
     
             //根据时间查找歌词
             let i=0
             for(;i<ctx.lyricInfos.length;i++){
                 const lyricInfo =ctx.lyricInfos[i]
                 if(currentTime<lyricInfo.time){
                     break
                 }
                 }
                 //设置当前歌词
                     const currentIndex=i-1
                     if(ctx.currentLyricIndex!==currentIndex){
                         const currentLyricInfo=ctx.lyricInfos[currentIndex]
                         ctx.currentLyricIndex=currentIndex
                         ctx.currentLyricText=currentLyricInfo.text
                 }
             })

             audioContext.onEnded(()=>{
                this.dispatch("changeNewMusicAction")
             })
             audioContext.onPlay(()=>{
                ctx.isPlaying=true
             })
             audioContext.onPause(()=>{
                ctx.isPlaying=false
             })
             audioContext.onStop(()=>{
                 ctx.isPlaying=false
                 ctx.isStoping=true
             })
        },
        changeMusicPlayStatusAciton(ctx,isPlaying=true){
            ctx.isPlaying=!ctx.isPlaying
            if(ctx.isPlaying&&ctx.isStoping){
                audioContext.src=`https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
                audioContext.title=currentSong.name
               
            }
            ctx.isPlaying?audioContext.play():audioContext.pause()
            if(ctx.isStoping){
                audioContext.seek(ctx.currentTime)
                ctx.isStoping=false
            }
        },
        changeNewMusicAction(ctx,isNext=true){
            let index=ctx.playListIndex

            switch(ctx.playModeIndex){
                case 0:
                    index=isNext?index+1:index-1
                    if(index===-1) index=ctx.playListSongs.length-1
                    if(index===ctx.playListSongs.length) index=0
                    break
                    case 1:
                        break
                        case 2:
                            index=Math.floor(Math.random()*ctx.playListSongs.length)
                            break
            }
            ctx.playListIndex=index
            let currentSong=ctx.playListSongs[index]
            if(!currentSong){
                currentSong=ctx.currentSong
            }else{
                ctx.playListIndex=index
            }

            this.dispatch("playMusicWithSongIdAction",{id:currentSong.id,isRefresh:true})
        },
    }
})
export{
    audioContext,
    playerStroe
}