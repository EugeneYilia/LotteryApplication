//线性图
var dimen = require("../../utils/util.js");


//创建 canvas 绘图
const context_line = wx.createCanvasContext('line-canvas');
var canvasWidth_line = 0;
var canvasHeight_line = 0;

// x轴放大倍数
var ratioX = 10.4;
// y轴放大倍数
var ratioY = 8;

// 紫色
var purple = '#7E8FDD';
// 浅紫
var lightPurple = '#D6DBF4';
// 灰色
var gray = '#cccccc';
// 浅灰
var lightGray = '#c7cce5';
// 橙色
var orange = '#ffaa00';
// 浅橙色
var lightOrange = '#DAD7DC';
var black ='#878383';
// 板岩暗蓝灰色
var SlateBlue = '#6A5ACD';

// 最大访问人数
var maxUV = 0;
var count = 0;


Page({
  data: {
    processJsonArray: [], 
    processWinJsonArray: [],   //调用数据
    processLoseJsonArray: [],
    processDrawJsonArray: [],
  },

  onLoad: function (options) {   //登陆
    this.data.processJsonArray= JSON.parse(options.processJsonArray);
    //this.data.processLoseJsonArray = JSON.parse(options.processLoseJsonArray);
   // this.data.processDrawJsonArray = JSON.parse(options.processDrawJsonArray);
    this.data.processWinJsonArray = this.data.processJsonArray.processWinJsonArray;
    this.data.processLoseJsonArray = this.data.processJsonArray.processLoseJsonArray;
    this.data.processDrawJsonArray = this.data.processJsonArray.processDrawJsonArray;
    console.log(this.data.processWinJsonArray);
    console.log(this.data.processLoseJsonArray);
    console.log(this.data.processDrawJsonArray);
    var list = this.data.processWinJsonArray;
    var list1 = this.data.processLoseJsonArray;
    var list2 = this.data.processDrawJsonArray;
  
    //获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        dimen.init(res.windowWidth);      //初始化屏幕自适应
        canvasWidth_line = dimen.rpx2px(710);    // 折线图的画布宽度
        canvasHeight_line = dimen.rpx2px(400);   // 折线图的画布高度
      }
    });

    this.loadForVisitTrend(list, list1, list2);
  },

  loadForVisitTrend: function (list,list1,list2) {
    this.drawVisitBackground();   // 画横向参照线 
    this.drawDate(this.data.processWinJsonArray, this.data.processLoseJsonArray, this.data.processDrawJsonArray);  //画日期以及折线图
    this.draw();    //画

  },


  /* 画横向参照线 */
  drawVisitBackground: function () {
    var lineCount = 4;    //5条
    var estimateRatio = 2;
    var ratio = (canvasHeight_line + dimen.rpx2px(40)) / lineCount;
    var max = ((Math.floor(Math.floor(4 / 10) / 4) + 1) * 4) * 10;
    for (var i = 0; i < lineCount; i++) {
      context_line.beginPath();   //创建一个新路径
      //设置当前坐标点
      var currentPoint = {
        x: dimen.rpx2px(40),
        y: (canvasHeight_line - i * ratio) - dimen.rpx2px(40)
      };
      // 移动到当前坐标点
      context_line.moveTo(currentPoint.x, currentPoint.y);
      // 向Y正轴方向画线
      context_line.lineTo(canvasWidth_line - dimen.rpx2px(10), (canvasHeight_line - i * ratio) - dimen.rpx2px(40));
      // 设置属性
      context_line.setLineWidth(dimen.rpx2px(2));
      // 设置颜色
      context_line.setStrokeStyle(black);
      context_line.stroke();
      // 标注数值
      context_line.setFillStyle(gray);
      // 底部人数文字
      context_line.fillText(i * max / (lineCount - 1), currentPoint.x - dimen.rpx2px(40), currentPoint.y);
    }
  },


  /* 画底部日期以及折线 */
  drawDate: function (list,list1,list2) {
    var win = [];
    var lose=[];
    var draw=[];
    var k = 0;
    var ref_date1 = "";
    var win_odds1 = "";
    var lose_odds1 = "";
    var draw_odds1 = "";
   // var temp_ref_date1 = "";
    //var temp_ref_date2 = "";
    list=list.split(",");
    list1 = list1.split(",");
    list2 = list2.split(",");
   //console.log(typeof(list));

   //画底部日期
    for(var i=0,length=list.length;i<length;i++){
      
        context_line.setFillStyle(gray);    //灰色
        if((i%2)==1){
          var ref_date = "";
           for(var j=14;j<19;j++){
             ref_date1 = list[i][j];
             ref_date += ref_date1;
           }
           console.log(ref_date);
           if(i%3==0){
             if((i+5)<list.length){
                context_line.fillText(ref_date, i * ratioX + dimen.rpx2px(10), canvasHeight_line - dimen.rpx2px(10));
               var win_odds = "";
               var lose_odds="";
               var draw_odds="";
               
               for (var j = 14; j < 18; j++) {
                 lose_odds1 = list1[i - 1][j];
                 lose_odds += lose_odds1;

               }
               for (var j = 14; j < 17; j++) {
                 draw_odds1 = list2[i - 1][j];
                 draw_odds += draw_odds1;

               }

               for (var j = 13; j < 16; j++) {
                 win_odds1 = list[i-1][j];
                 win_odds += win_odds1;
               
                }
              console.log(win_odds);
              console.log(lose_odds);
              console.log(draw_odds);
              win[k]=win_odds;
              lose[k] = lose_odds;
              draw[k] = draw_odds;
              k++;       
            }    
           }
    };
    }
       

       //画win折线
    for(var count=0;count<win.length-1;count++){
    //x,y轴放大倍数
    ratioX = (canvasWidth_line - dimen.rpx2px(30)) /win.length;
    ratioY = (canvasHeight_line - dimen.rpx2px(80))/0.5;
    var currentPoint = {
      x: count * ratioX + dimen.rpx2px(40),
      y: (canvasHeight_line - win[count] * ratioY) - dimen.rpx2px(40)
    };
    // 下一个点坐标
    var nextPoint = {
      x: (count + dimen.rpx2px(2)) * ratioX + dimen.rpx2px(40),
      y: (canvasHeight_line - win[count + 1]* ratioY) - dimen.rpx2px(40)
    }

    // 开始路径
    context_line.beginPath();
    // 画线：移动到当前点
    context_line.moveTo(currentPoint.x, currentPoint.y);
    // 画线：画线到下个点
    context_line.lineTo(nextPoint.x, nextPoint.y);
    // 设置线宽度
    context_line.setLineWidth(dimen.rpx2px(2));
    // 设置线颜色
    context_line.setStrokeStyle('red');
    // 描线
    context_line.stroke();
    context_line.stroke();
    context_line.beginPath();
    context_line.arc(currentPoint.x, currentPoint.y, 2, 0, 4 * Math.PI);
    context_line.setStrokeStyle(purple);
    context_line.setFillStyle('white');
    context_line.stroke();
    context_line.fill();
  }



   //画Lose折线
    for (var count = 0; count <lose.length-1; count++) {
      //x,y轴放大倍数
      ratioX = (canvasWidth_line - dimen.rpx2px(30)) /lose.length;
      ratioY = (canvasHeight_line - dimen.rpx2px(80))/lose[count];
      var currentPoint = {
        x: count * ratioX + dimen.rpx2px(40),
        y: (canvasHeight_line - lose[count] * ratioY) - dimen.rpx2px(40)
      };
      // 下一个点坐标
      var nextPoint = {
        x: (count + dimen.rpx2px(2)) * ratioX + dimen.rpx2px(40),
        y: (canvasHeight_line - lose[count + 1] * ratioY) - dimen.rpx2px(40)
      }

      // 开始路径
      context_line.beginPath();
      // 画线：移动到当前点
      context_line.moveTo(currentPoint.x, currentPoint.y);
      // 画线：画线到下个点
      context_line.lineTo(nextPoint.x, nextPoint.y);
      // 设置线宽度
      context_line.setLineWidth(dimen.rpx2px(2));
      // 设置线颜色
      context_line.setStrokeStyle('black');
      // 描线
      context_line.stroke();
      context_line.stroke();
      context_line.beginPath();
      context_line.arc(currentPoint.x, currentPoint.y, 2, 0, 4 * Math.PI);
      context_line.setStrokeStyle(purple);
      context_line.setFillStyle('white');
      context_line.stroke();
      context_line.fill();
    }
    

    //画Draw折线
    for (var count = 0; count < draw.length-1; count++) {
      //x,y轴放大倍数
      ratioX = (canvasWidth_line - dimen.rpx2px(30)) / draw.length;
      ratioY = (canvasHeight_line - dimen.rpx2px(80)) /draw[count];
      var currentPoint = {
        x: count * ratioX + dimen.rpx2px(40),
        y: (canvasHeight_line - draw[count] * ratioY) - dimen.rpx2px(40)
      };
      // 下一个点坐标
      var nextPoint = {
        x: (count + dimen.rpx2px(2)) * ratioX + dimen.rpx2px(40),
        y: (canvasHeight_line - draw[count + 1] * ratioY) - dimen.rpx2px(40)
      }

      // 开始路径
      context_line.beginPath();
      // 画线：移动到当前点
      context_line.moveTo(currentPoint.x, currentPoint.y);
      // 画线：画线到下个点
      context_line.lineTo(nextPoint.x, nextPoint.y);
      // 设置线宽度
      context_line.setLineWidth(dimen.rpx2px(2));
      // 设置线颜色
      context_line.setStrokeStyle('yellow');
      // 描线
      context_line.stroke();
      context_line.beginPath();
      context_line.arc(currentPoint.x, currentPoint.y, 2, 0, 4* Math.PI);
      context_line.setStrokeStyle(purple);
      context_line.setFillStyle('white');
      context_line.stroke();
      context_line.fill();
    }






  },

  // 画
  draw: function () {
    context_line.draw(true);
  },

})
