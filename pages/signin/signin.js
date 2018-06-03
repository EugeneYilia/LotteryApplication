// pages/signin/signin.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition1:false,
    condition2:true,
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

 reward:function(){
   wx.login({
     success: function (res) {
       console.log(res.code);
       var urlData = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxd6823bc3bf101bf9&secret=f36816b2eef8772c284af03523890dc9&js_code=' + res.code + '&grant_type=authorization_code'
       if (res.code) {
         wx.request({
           url: 'https://eugeneliu.top/getOpenid',
           method: "POST",
           data: {
             url: urlData
           },
           header: {
             'content-type': 'application/json'
           },
           success: function (res) {
             console.log('res.data' + res.data)//返回openid
             wx.request({
               url: 'https://eugeneliu.top/user/isSignIn',
               method: 'POST',
               data: { openid: res.data },
               header: { 'content-type': 'application/json' },
               success: function (res) {
                 console.log(res.data);
                 if (res.data == false) {
                   var that = this
                   wx.request({
                     url: 'https://eugeneliu.top/user/signIn',
                     method: "POST",
                     data: {
                       openid: res.data
                     },
                     header: {
                       'content-type': 'application/json'
                     },
                     success: function (res) {
                       console.log(res.data);
                       if (res.data == true) {
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
                                 if (res.data == 1 || 2) {
                                   app.globalData.caidou = app.globalData.caidou+150
                                 }

                                 else if (res.data == 3 || 4) {
                                   app.globalData.caidou = app.globalData.caidou+200
                                 }
                                 else if (res.data == 5 || 6) {
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


                 }else if(res.data==true){
                   wx.showModal({
                     title: '提示',
                     content: '已经签过到了！',
                     success: function (res) {
                       if (res.confirm) {
                         console.log('用户点击确定')

                       } else if (res.cancel) {
                         console.log('用户点击取消')
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
   console.log(app.globalData.caidou)
    wx.login({
      success: function (res) {
        console.log(res.code);
        var urlData = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxd6823bc3bf101bf9&secret=f36816b2eef8772c284af03523890dc9&js_code=' + res.code + '&grant_type=authorization_code'
        if (res.code) {
          wx.request({
            url: 'https://eugeneliu.top/getOpenid',
            method: "POST",
            data: {
              url: urlData
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log('res.data' + res.data)//返回openid
              wx.request({
                url: 'https://eugeneliu.top/user/continuousSignInDays',
                method: 'POST',
                data: { openid: res.data },
                header: { 'content-type': 'application/json' },
                success: function (res) {
                  console.log(res.data);
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
          })

        }
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