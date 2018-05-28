//index.js
//获取应用实例
const app = getApp()


Page({

  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    buttonword: '签到详情',
    keynumber:12,
    caidou:1500,
  },


  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
            hasUserInfo: true,

          })
        }
      })
    }

    var that = this
    wx.request({
      url: 'https://eugeneliu.top/match/matchInformation/1/10',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          initData: res.data
        })
      },
      fail: function () {
        console.log('请求失败')
      }
    })

  },
  evaluate:function(){
    wx.navigateTo({
      url: '../evaluate/evaluate'
    })


  },

   getbeans: function () {
    wx.navigateTo({
      url: '../getbeans/getbeans'
    })


  },

  exchange:function(){
    wx.navigateTo({
      url: '../exchangeprize/exchangeprize'
    })
  },


  drawluck:function(){
    wx.navigateTo({
      url: '../luckdraw/luckdraw'
    })
  },



  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

  },

  signiture: function () {
    wx.navigateTo({
      url: '../signiture/signiture'
    })

  },


  bindViewTap: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },



 



});







