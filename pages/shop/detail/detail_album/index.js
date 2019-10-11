// pages/shop/detail/detail_album/index.js
import api from '../../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buildingGroupId: 1,
    type: 1,
    picIndex: 0,
    picQty: 0,
    picList: [],
    picTypeList: {},
    videoIndex: 0,
    videoQty: 0,
    videoList: [],
    videoTypeList: {},
    imgview: '',
    imgview_x: 0,
    imgview_y: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      buildingGroupId: options.buildingGroupId
    })

    this.getBuildingAttch(1);
    this.getBuildingAttch(2);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getBuildingAttch(type) {
    var data = {
      buildingGroupId: this.data.buildingGroupId,
      type: type
    }

    api.getbuildingattch(data).then((res) => {
      if (res.data.code == 1) {
        var typelist = {};
        res.data.content.list.forEach((item) => {
          if (!typelist[item.picTypeId] && item.picTypeName) {
            typelist[item.picTypeId] = item.picTypeName
          }
        })
        if (type == 1) {
          this.setData({
            picList: res.data.content.list,
            picQty: res.data.content.list.length,
            picTypeList: typelist
          })
        } else if (type == 2) {
          this.setData({
            videoList: res.data.content.list,
            videoQty: res.data.content.list.length,
            videoTypeList: typelist
          })
        }
      }
    })

  },
  setType(e) {
    this.setData({
      type: e.currentTarget.dataset.key
    })
  },
  pic_change_handle(e) {
    this.setData({
      picIndex: e.detail.current
    })
  },
  video_change_handle(e) {
    this.setData({
      videoIndex: e.detail.current
    })
  },
  goPic(e) {
    var key = parseInt(e.currentTarget.dataset.key);
    var index = 0;

    for (let i = 0; i < this.data.picList.length; i++) {
      var item = this.data.picList[i];
      if (item.picTypeId == key) {
        index = i;
        break;
      }
    }

    this.setData({
      picIndex: index
    })
  },
  view_img_handle(e) {
    this.setData({
      imgview: e.currentTarget.dataset.key,
      imgview_x: e.currentTarget.offsetLeft,
      imgview_y: e.currentTarget.offsetTop
    })
  },
  close_imgview_handle(e) {

    this.setData({
      imgview: ''
    })
  }
})