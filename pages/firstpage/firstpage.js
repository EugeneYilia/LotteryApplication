//index.js
//获取应用实例
const app = getApp();
const APP_ID = 'wxd6823bc3bf101bf9';//输入小程序appid  
const APP_SECRET = 'f36816b2eef8772c284af03523890dc9';//输入小程序app_secret  
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key 
var code='' 
var openid=''
var Caidou=app.globalData.caidou
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    buttonword: '签到详情',
    keynumber:12,
    caidou:Caidou,
    show:false,

    condition1: false,
    condition2: true,
    second1: false,
    second2: true,
    third1: false,
    third2: true,
    fourth1: false,
    fourth2: true,
    fifth1: false,
    fifth2: true,
    sixth1: false,
    sixth2: true,
    seventh1: false,
    seventh2: true,
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

    var that = this;
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
    //判断第几天签到
   
 

    //获取用户唯一标识
    wx.login({
      success: function (res) {
        console.log(res.code);
        var urlData = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxd6823bc3bf101bf9&secret=f36816b2eef8772c284af03523890dc9&js_code=' + res.code + '&grant_type=authorization_code'
         if(res.code){
           wx.request({
             url:'https://eugeneliu.top/getOpenid' ,
             method:"POST",
             data: {
               url: urlData   
               },
             header: {
               'content-type': 'application/json'
             },
             success: function (res) {
               console.log('res.data' + res.data)//返回openid
               OPEN_ID=res.data;
               wx.request({
                 url: 'https://eugeneliu.top/user/isSignIn',
                 method:'POST',
                 data:{openid:res.data},
                 header: { 'content-type': 'application/json'},
                 success:function(res){
                    console.log(res.data);
                    if(res.data==false){
                      that.setData({
                       show:true
                      });
                      wx.request({
                        url: 'https://eugeneliu.top/user/continuousSignInDays',
                        method: "POST",
                        data: {
                          openid: OPEN_ID
                        },
                        header: {
                          'content-type': 'application/json'
                        },
                        success: function (res) {
                          console.log(res.data)
                          if (res.data == 1) {
                            that.setData({
                              condition1: true,
                              condition2: false,
                              second1: false,
                              second2: true,
                              third1: false,
                              third2: true,
                              fourth1: false,
                              fourth2: true,
                              fifth1: false,
                              fifth2: true,
                              sixth1: false,
                              sixth2: true,
                              seventh1: false,
                              seventh2: true,
                            })
                          }
                          else if (res.data == 0) {
                            that.setData({
                              condition1: false,
                              condition2: true,
                              second1: false,
                              second2: true,
                              third1: false,
                              third2: true,
                              fourth1: false,
                              fourth2: true,
                              fifth1: false,
                              fifth2: true,
                              sixth1: false,
                              sixth2: true,
                              seventh1: false,
                              seventh2: true,
                            })
                          }
                          else if (res.data == 2) {
                            that.setData({
                              condition1: true,
                              condition2: false,
                              second1: true,
                              second2: false,
                              third1: false,
                              third2: true,
                              fourth1: false,
                              fourth2: true,
                              fifth1: false,
                              fifth2: true,
                              sixth1: false,
                              sixth2: true,
                              seventh1: false,
                              seventh2: true,
                            })
                          }
                          else if (res.data == 3) {
                            that.setData({
                              condition1: true,
                              condition2: false,
                              second1: true,
                              second2: false,
                              third1: true,
                              third2: false,
                              fourth1: false,
                              fourth2: true,
                              fifth1: false,
                              fifth2: true,
                              sixth1: false,
                              sixth2: true,
                              seventh1: false,
                              seventh2: true,
                            })
                          }
                          else if (res.data == 4) {
                            that.setData({
                              condition1: true,
                              condition2: false,
                              second1: true,
                              second2: false,
                              third1: true,
                              third2: false,
                              fourth1: true,
                              fourth2: false,
                              fifth1: false,
                              fifth2: true,
                              sixth1: false,
                              sixth2: true,
                              seventh1: false,
                              seventh2: true,
                            })
                          }
                          else if (res.data == 5) {
                            that.setData({
                              condition1: true,
                              condition2: false,
                              second1: true,
                              second2: false,
                              third1: true,
                              third2: false,
                              fourth1: true,
                              fourth2: false,
                              fifth1: true,
                              fifth2: false,
                              sixth1: false,
                              sixth2: true,
                              seventh1: false,
                              seventh2: true,
                            })
                          }
                          else if (res.data == 6) {
                            that.setData({
                              condition1: true,
                              condition2: false,
                              second1: true,
                              second2: false,
                              third1: true,
                              third2: false,
                              fourth1: true,
                              fourth2: false,
                              fifth1: true,
                              fifth2: false,
                              sixth1: true,
                              sixth2: false,
                              seventh1: false,
                              seventh2: true,
                            })
                          }
                          else if (res.data == 7) {
                            that.setData({
                              condition1: true,
                              condition2: false,
                              second1: true,
                              second2: false,
                              third1: true,
                              third2: false,
                              fourth1: true,
                              fourth2: false,
                              fifth1: true,
                              fifth2: false,
                              sixth1: true,
                              sixth2: false,
                              seventh1: true,
                              seventh2: false,
                            })
                          }
                        }
                      })







                    }
                 }
               })


             }
           })

         } 
      }
    })
  },


  evaluate:function(){
    wx.navigateTo({
      url: '../evaluate/evaluate'
    })


  },
   getbeans: function () {
    
     console.log(Caidou)
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
      url: '../signin/signin'
    })

  },
  wxSearchClear:function(){
    var that=this
    that.setData({
      show: false
    })
  },
  reward:function(){
   var that =this
   wx.request({
     url: 'https://eugeneliu.top/user/signIn',
     method: "POST",
     data: {
       openid: OPEN_ID
     },
     header: {
       'content-type': 'application/json'
     },
     success: function (res) {
       console.log(res.data);
       if(res.data==true){
         var that = this
         that.setData({
           show: false,
         }),
           wx.showModal({
             title: '提示',
             content: '签到成功！',
             success: function (res) {
               if (res.confirm) {
                 console.log('用户点击确定')

               } else if (res.cancel) {
                 console.log('用户点击取消')
               }
             }
           }),
           wx.request({
             url: 'https://eugeneliu.top/user/continuousSignInDays',
             method: "POST",
             data: {
               openid: OPEN_ID
             },
             header: {
               'content-type': 'application/json'
             },
             success: function (res) {
               console.log(res.data)
               if (res.data == 1||2) {
                 app.globalData.caidou = app.globalData.caidou+150
               }
              
               else if (res.data ==3||4) {
                 app.globalData.caidou = app.globalData.caidou+200
               }
               else if (res.data == 5||6) {
                 app.globalData.caidou = app.globalData.caidou+250
               }
               else if (res.data == 7) {
                 app.globalData.caidou = app.globalData.caidou+500
               }
             }
           })


       }
     }
   })







  },





});







