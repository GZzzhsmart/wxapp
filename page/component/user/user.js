// page/component/new-pages/user/user.js
Page({
  data:{
    thumb:'',
    nickname:'',
    gender:'',
    city:'',
    orders: [{
      "number": "A4561245678641685",
      "thumb": "/image/c2.png",
      "name": "梨花带雨",
      "count": 3,
      "status": "待付款",
      "money": 5.00
    }],
    hasAddress:false,
    address:{}
  },
  onLoad(){
    var self = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function(res){
        self.setData({
          //用户头像
          thumb: res.userInfo.avatarUrl,
          //用户昵称
          nickname: res.userInfo.nickName,
          //用户性别
          gender: res.userInfo.gender,
          //用户城市
          city: res.userInfo.city
        })
      }
    }),

    /**
     * 发起请求获取订单列表信息
     */
    wx.request({
     
      url: 'http://www.gdfengshuo.com/api/wx/orders.txt',
      success(res){
        self.setData({
          orders: res.data
        })
      }
    });
  },

  onShow(){
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
  },
  /**
   * 发起支付请求
   */
  payOrders(){
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function(res){
        console.log(res)
      },
      fail: function(res) {
        wx.showModal({
          title:'支付提示',
          content:'<text>',
          showCancel: false
        })
      }
    })
  }
})
