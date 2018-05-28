// pages/self/self.js
var that

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myAvatar: '',
    myName: '',
    gender: '',
    genderMale: '男',
    genderFemale: '女',
    genderUnknown: '未知',
    myCountry: '',
    separator: '|',
    myProvince: '',
    myCity: '',
    locationUnknown: '未知'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.getUserInfo({
      success: function (res) {
        userInfo = res.userInfo
        nickName = userInfo.nickName
        avatarUrl = userInfo.avatarUrl
        genderTemp = userInfo.gender
        province = userInfo.province
        city = userInfo.city
        country = userInfo.country
        that.setData({
          myAvatar: avatarUrl,
          myName: nickName,
          gender: genderTemp,
          myCountry: country,
          myProvince: province,
          myCity: city
        })
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
    wx.stopPullDownRefresh()
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