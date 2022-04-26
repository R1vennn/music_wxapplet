import {getSearchHot,getSearchSuggest,getSearchResult} from '../../api/api_search'
import debounce from '../../utils/debounce'
import stringToNodes from '../../utils/string2nodes'

const debounceGetSearchSuggest =debounce(getSearchSuggest,300)

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotKeywords:[],
        suggestSongs:[],
        searchValue:"",
        suggestSongsNodes:[],
        resultSongs:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getPageData()
    },
    getPageData:function(){
        getSearchHot().then(res=>{
            this.setData({hotKeywords:res.result.hots})
        })
    },
    handleSearchChange:function(event){
        const searchValue=event.detail
        this.setData({searchValue})
        if(!searchValue.length){
            this.setData({suggestSongs:[],resultSongs:[]})
            debounceGetSearchSuggest.cancel()
            return
        }
        debounceGetSearchSuggest(searchValue).then(res=>{
            const suggestSongs=res.result.allMatch
            this.setData({suggestSongs})
            if (!suggestSongs) return

            const suggestKeywords = suggestSongs.map(item => item.keyword)
            const suggestSongsNodes = []
                for (const keyword of suggestKeywords) {
            const nodes = stringToNodes(keyword, searchValue)
                suggestSongsNodes.push(nodes)
         }
             this.setData({ suggestSongsNodes })
    })
    },
    handleSearchAction:function(){
        const searchValue=this.data.searchValue
        if(!searchValue) return
        getSearchResult(searchValue).then(res=>{
            this.setData({resultSongs:res.result.songs})
        })
    },
    handleKeywordItemClick:function(event){
        const keyword = event.currentTarget.dataset.keyword
        this.setData({ searchValue: keyword })
        this.handleSearchAction()
    },
})