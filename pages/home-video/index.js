import {getTopMV} from '../../api/api_video'

// pages/home-video/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topMVs: [],
        hasMore:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:function (options) {
          this.getTopMVData(0)
     
    },
    //封装网络请求方法
    getTopMVData:async function(offset){
      //判断是否可以请求
        if(!this.data.hasMore&& offset!==0) return


      //请求数据
        const res=await getTopMV(offset)
        let newData=this.data.topMVs
        if(offset===0){
            newData=res.data
        }else{
            newData=newData.concat(res.data)
        }
       
       //设置数据
        this.setData({topMVs:newData}) 
        this.setData({hasMore:res.hasMore})
        if(offset===0){
            wx.stopPullDownRefresh()
        }
    },

    //封装事件处理方法
    handleVideoItemClick:function(event){
        const id =event.currentTarget.dataset.item.id
        wx.navigateTo({
          url: `/pages/detail-video/index?id=${id}`,
        })
    },


    //其他生命周期回调函数
    onPullDownRefresh:function(){
        this.getTopMVData(0)
    },

    onReachBottom:function(){
        this.getTopMVData(this.data.topMVs.length)
    }
})