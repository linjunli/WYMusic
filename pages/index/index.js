//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabs: ["推荐", "歌手", "我的"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    playlist:[],
    isLast:false,
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostIp +"/index/apiGetInfo",
      dataType:"json",
      method:"post",
      data:{
        cat:"全部",
      },
      success: (result) => {
        let data = result['data'];
        let ret =data.ret,
            msg = data.msg;
        if (data && ret == 0) {
          let playlist = data.play_list.playlists;
          this.setData({
            playlist: playlist,
          })
        }
        console.log(result)
      },
      error:() => {
        console.log("fatal error")
      }      
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  navigateTo: function(e) {

  },
  clickMe : function(e) {
    console.log(e);
    this.setData({motto:"has clicked"});
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
