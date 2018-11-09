Page({
  data: {
    isPopping: false,//是否已经弹出
    animPlus: {},//旋转动画
    animCollect: {},//item位移,透明度
    animTranspond: {},//item位移,透明度
    animInput: {},//item位移,透明度
    //内部属性 
    drag_style: {
      x: "32px",
      y: "480px"
    },
    preX: "",
    preY: "",
    screen: {
      width: "",
      height: ""
    },
    w: 0,
    h:0,
    type: "",
    dragx: "",
    dragy: ""
  },
  //点击弹出
  plus: function () {
    if (this.data.isPopping) {
      //缩回动画
      this.popp();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画
      this.takeback();
      this.setData({
        isPopping: true
      })
    }
  },
  // 内部方法建议以下划线开头
  touchMoveChange(e) {
    this.takeback();
    this.setData({
      isPopping: true
    })
    var _e$currentTarget = e.currentTarget,
      currentTarget = _e$currentTarget === undefined ? {} : _e$currentTarget;
    var _currentTarget$datase = currentTarget.dataset,
      dataset = _currentTarget$datase === undefined ? {} : _currentTarget$datase;

    var tmpx = parseInt(e.touches[0].clientX);
    var tmpy = parseInt(e.touches[0].clientY);
    if (tmpx <= 0 || tmpy <= 0 || tmpx >= this.data.screen.width || tmpy >= this.data.screen.height) {
        console.log(222)
    } else {
      console.log(333)
      if (tmpx != this.data.preX || tmpy != this.data.preY) {
        // console.log(e.touches[0].clientX, "-X-", e.touches[0].pageX)
        // console.log(e.touches[0].clientY, "-Y-", e.touches[0].pageY)
        this.data.preX = tmpx
        this.data.preY = tmpy
        this.setData({
          drag_style: {
            x: tmpx - this.data.w + "px",
            y: tmpy - this.data.h + "px",
          }
        })
      }
    }
    // this.triggerEvent('touchMove', {});
  },
  input: function () {
    console.log("input")
  },
  transpond: function () {
    console.log("transpond")
  },
  collect: function () {
    console.log("collect")
  },

  //弹出动画
  popp: function () {
    
    //plus顺时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animTopOne = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var x = (typeof this.data.drag_style.x) == 'number' ? 0 :  this.data.drag_style.x.slice(0,-2);
    if (this.data.screen.width / 2 > x) {
      animationPlus.rotateZ(180).step();
      animTopOne.translate(0, -120).rotateZ(180).opacity(1).step();
      animationcollect.translate(80, 80).rotateZ(180).opacity(1).step();
      animationTranspond.translate(120, 0).rotateZ(180).opacity(1).step();
      animationInput.translate(80, -80).rotateZ(180).opacity(1).step();
    } else {
      animationPlus.rotateZ(180).step();
      animTopOne.translate(0, -120).rotateZ(180).opacity(1).step();
      animationcollect.translate(-80, -80).rotateZ(180).opacity(1).step();
      animationTranspond.translate(-120, 0).rotateZ(180).opacity(1).step();
      animationInput.translate(-80, 80).rotateZ(180).opacity(1).step();
    }
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
      animTopOne: animTopOne.export()
    })
  },
  //收回动画
  takeback: function () {
    //plus逆时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animTopOne = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animTopOne.translate(0, 0).rotateZ(0).opacity(0).step();
    animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
      animTopOne: animTopOne.export(),
    })
  },


  onLoad: function (options) {
    // 生命周期函数--监听页面加载
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        // 可使用窗口宽度、高度
        // console.log('height=' + res.windowHeight);
        // console.log('width=' + res.windowWidth);
        // Math.ceil()

        if (res.platform == "android") {
          res.windowHeight = res.screenHeight;
        }


        self.setData({
          screen: {
            width: res.windowWidth,
            height: res.windowHeight,
            pixelRatio: res.pixelRatio,
            ratio: res.windowWidth * res.pixelRatio / 750
          }
        })
      }
    })
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})
