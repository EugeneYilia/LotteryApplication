var width = 375;        //屏幕宽为375px
var r = 0.5;  // 比率     共有750个物理像素
function init(w) {
  width = w;
  r = width / 750.0;
}

function px2rpx(px) {   //  1rpx == 0.5px
  var rpx = px / r;
  return rpx;
}

function rpx2px(rpx) {
  var px = rpx * r;
  return px;
}


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  init: init,
  px2rpx: px2rpx,
  rpx2px: rpx2px,
  formatTime: formatTime
}
