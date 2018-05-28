//index.js
//获取应用实例
const app = getApp()
//搜索函数
var search=null;

Page({

  data: {
    companyData: [],
    listData: [],
    initData:[],
    processJsonArray: [],
    //processDrawJsonArray: [],
   // processLoseJsonArray: [],
    userInfo: {},
    initdate:'__/__/__',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    Vip:'到期时间：',
    buttonword:'开通会员',
    infor:'',
    Infor:''
  },

  
  onLoad: function () {
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
            hasUserInfo: true,
            
          })
        }
      })
    }

    var that=this
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

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
 
  },
  
  startvip:function(){
    wx.navigateTo({
      url: '../person/person'
    })

  },
  bindViewTap:function(){
    wx.navigateTo({
      url: '../login/login'
    })
  },



toinfor:function(){
  var that=this
  wx.request({
    url: 'https://eugeneliu.top/match/matchArray/4',
    data: {},
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res);
      that.setData({
        processJsonArray: res.data,
        //processLoseJsonArray: res.data.processLoseJsonArray,
       // processWinJsonArray: res.data.processWinJsonArray,
      });
      //var processWinJsonArray= JSON.stringify(this.data.processWinJsonArray)
      console.log(that.data.processJsonArray);
      wx.navigateTo({
        url: '../evaluate/evaluate?processJsonArray=' + JSON.stringify(that.data.processJsonArray),
       // url: '../evaluate/evaluate?processLoseJsonArray=' + JSON.stringify(that.data.processLoseJsonArray),
        //url: '../evaluate/evaluate?processDrawJsonArray=' + JSON.stringify(that.data.processDrawJsonArray)
      })
    },
    fail: function () {
      console.log('请求失败')
    }
  });


},




/*
  toinfor:function(){
   
   let matchArray=JSON.stringify(matchArray);

    wx.navigateTo({
      url: "../evaluate/evaluate?matchArray="+matchArray,
    });

  },

 */


  inforinput:function(e){
   this.setData({
       infor:e.detail.value
   })


  },

  search: function () {
    console.log('请求数据')
    var infor=this.data.infor
    wx.request({
      url: 'https://eugeneliu.top/match/matchInformation/',
      data: {
        'info': infor
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        //console.log(res)
        that.setData({
          listData: res.data
        })
      },
      fail: function () {
        console.log('请求失败')
      }
    })
  },

  wxSearchClear:function() {
   
       this.setData({
       Infor:""
    });
  }

});







