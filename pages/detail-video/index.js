import {getMVURL,getMVDetail,getRelatedMV} from '../../api/api_video'


Page({

    /**
     * 页面的初始数据
     */
    data: {
        mvURLInfo:{},
        mvDetail:{},
        relatedVideos:{},
        danmuList:[{
            text:'哇！YB好帅',
            color:'#ff0000',
            time:1
        },
        {
            text:'YB,我的超人',
            color:'#FFAEC9',
            time:3
        },
        {
            text:'YB,我的超人',
            color:'#FFAEC9',
            time:3
        },
        {
            text:'YB,我的超人',
            color:'#FFAEC9',
            time:3
        },
        {
            text:'YB,我的超人',
            color:'#FFAEC9',
            time:3
        },
        {
            text:'YB,我的超人',
            color:'#FFAEC9',
            time:3
        },
        {
            text:'YB,我的超人',
            color:'#FFAEC9',
            time:3
        },
        {
            text:'YB,我的超人',
            color:'#FFAEC9',
            time:3
        },
        {
            text:'YB,我的超人',
            color:'#FFAEC9',
            time:3
        },
        {
            text:'YB,我的超人',
            color:'#FFAEC9',
            time:3
        },
        {
            text:'YB,我的超人',
            color:'#FFAEC9',
            time:3
        },
        {
            text:'勾八炒粉',
            color:'#ff00ff',
            time:6
        },
        {
            text:'勾八炒粉',
            color:'#ff00ff',
            time:6
        },
        {
            text:'勾八炒粉',
            color:'#ff00ff',
            time:6
        },
        {
            text:'勾八炒粉',
            color:'#ff00ff',
            time:6
        },
        {
            text:'勾八炒粉',
            color:'#ff00ff',
            time:6
        },
        {
            text:'勾八炒粉',
            color:'#ff00ff',
            time:6
        },
        {
            text:'勾八炒粉',
            color:'#ff00ff',
            time:6
        },
        {
            text:'勾八炒粉',
            color:'#ff00ff',
            time:6
        },
        {
            text:'勾八炒粉',
            color:'#ff00ff',
            time:6
        },
        {
            text:'勾八炒粉',
            color:'#ff00ff',
            time:6
        },
        {
            text:'勾八炒粉',
            color:'#ff00ff',
            time:6
        },
        {
            text:'勾八炒粉',
            color:'#ff00ff',
            time:6
        },
        {
            text:'勾八炒粉',
            color:'#ff00ff',
            time:6
        },
        {
            text:'勾八炒粉',
            color:'#ff00ff',
            time:6
        },
        {
            text:'勾八炒粉',
            color:'#ff00ff',
            time:6
        },
        {
            text:'勾八李哥',
            color:'#ff00ff',
            time:8
        },
        {
            text:'勾八李哥',
            color:'#ff00ff',
            time:8
        },
        {
            text:'勾八李哥',
            color:'#ff00ff',
            time:8
        },
        {
            text:'勾八李哥',
            color:'#ff00ff',
            time:8
        },
        {
            text:'勾八李哥',
            color:'#ff00ff',
            time:8
        },
        {
            text:'勾八李哥',
            color:'#ff00ff',
            time:8
        },
        {
            text:'勾八李哥',
            color:'#ff00ff',
            time:8
        },
        {
            text:'勾八李哥',
            color:'#ff00ff',
            time:8
        },
        {
            text:'勾八李哥',
            color:'#ff00ff',
            time:8
        },
        {
            text:'勾八李哥',
            color:'#ff00ff',
            time:8
        },
        {
            text:'勾八李哥',
            color:'#ff00ff',
            time:8
        },
        {
            text:'勾八李哥',
            color:'#ff00ff',
            time:8
        },
        {
            text:'勾八李哥',
            color:'#ff00ff',
            time:8
        },
        // {
        //     text:'勾八朵朵',
        //     color:'#FFAEC9',
        //     time:10
        // },
        // {
        //     text:'勾八朵朵',
        //     color:'#FFAEC9',
        //     time:10
        // },
        // {
        //     text:'勾八朵朵',
        //     color:'#FFAEC9',
        //     time:10
        // },
        // {
        //     text:'勾八朵朵',
        //     color:'#FFAEC9',
        //     time:10
        // },
        // {
        //     text:'勾八朵朵',
        //     color:'#FFAEC9',
        //     time:10
        // },
        // {
        //     text:'勾八朵朵',
        //     color:'#FFAEC9',
        //     time:10
        // },
        // {
        //     text:'勾八朵朵',
        //     color:'#FFAEC9',
        //     time:10
        // },
        // {
        //     text:'勾八朵朵',
        //     color:'#FFAEC9',
        //     time:12
        // },
        // {
        //     text:'勾八朵朵',
        //     color:'#FFAEC9',
        //     time:14
        // },
        // {
        //     text:'勾八朵朵',
        //     color:'#FFAEC9',
        //     time:16
        // },
        // {
        //     text:'勾八朵朵',
        //     color:'#FFAEC9',
        //     time:18
        // },
        // {
        //     text:'勾八朵朵',
        //     color:'#FFAEC9',
        //     time:20
        // },
        // {
        //     text:'勾八朵朵',
        //     color:'#FFAEC9',
        //     time:21
        // },
        // {
        //     text:'勾八朵朵',
        //     color:'#FFAEC9',
        //     time:22
        // }
    ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const id=options.id

        this.getPageData(id)
    },


    getPageData:function(id){
        getMVURL(id).then(res=>{
            this.setData({mvURLInfo:res.data})
        })

        getMVDetail(id).then(res=>{
            this.setData({mvDetail:res.data})
        })

        getRelatedMV(id).then(res=>{
            this.setData({relatedVideos:res.data})
        })
    }
})