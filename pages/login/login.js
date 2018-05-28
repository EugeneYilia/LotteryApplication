// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:''
  },
setname:function(e){
   this.data.username=e.detail.value;
},

setpwd: function (e) {
  this.data.password= e.detail.value;
},

//登录函数
tologin:function(){
  var username=this.data.username
  var password=this.data.password

   wx.request({
     url: '/',
     data:{
       "username":username,
       "password":password
     },
     success:function(res){
         wx.showToast({
           title: '登录成功',
           icon:'success',
           duration:2000
         }),
         wx.navigateTo({
           url: '../person/person',
         })

     }

   })

},

//去注册
toregister:function(){
  wx.navigateTo({
    url: '../register/register'
  })
},




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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