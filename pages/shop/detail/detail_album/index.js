// pages/shop/detail/detail_album/index.js
import api from '../../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseType: 0, //0:一手房；1：二手房
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
      buildingGroupId: options.buildingGroupId,
      houseType: options.houseType
    })

    this.getBuildingAttch(1);
    this.getBuildingAttch(2);
  },
  getBuildingAttch(type) {
    var data = {
      buildingGroupId: this.data.buildingGroupId,
      type: type
    }

    var func = api.getbuildingattch;
    if (this.data.houseType == 1) {
      func = api.getHousePicList;
      data = {
        id: this.data.buildingGroupId,
        pageNo: 1,
        pageSize: 30,
        type: type
      }
    }

    func(data).then((res) => {
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