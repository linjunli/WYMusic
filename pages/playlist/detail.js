// pages/playlist/detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlist:{},
    privileges:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = Number.parseInt(options.id),
        s = Number.parseInt(options.s | 1),
        n = Number.parseInt(options.n | 1);
    wx.request({
      url: app.globalData.hostIp+'/playlist/apiGetPlayListDetail',
      dataType: "json",
      method: "post",
      data: {
        id: id,
        s : s,
        n : n
      },
      success : function(result) {
        console.log(result);
        let data = result.data,
            ret = data.ret;
        if (ret == 0) {
          let netData = data.data,
            code = netData.code;
          if (code == 200) {
            let playlist = netData.playlist,
                privileges = netData.privileges;
                console.log(playlist,privileges);
          } else {
            console.log("request fail,code !=200");
          }
        } else {
          console.log("cgi req fail");
        }
      },
      error : function() {

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})