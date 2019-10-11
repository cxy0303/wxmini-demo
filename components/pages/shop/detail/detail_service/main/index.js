import api from '../../../../../../utils/api.js'
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    buildingId: {
      type: Number,
      value: 0
    },
    buildingGroupName: {
      type: String,
      value: ''
    },
    sureRedirect: { //点击报备是返回上级，还是重定向；注：假设此页面为B，则目前两种情况:A->C->B   A->B->C
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0, //tab选项卡
    address: {
      detail: ''
    },
    service: {
      s113: { //自驾
        id: -1,
        tip: ''
      },
      s114: { //免费班车
        id: -1,
        tip: ''
      },
      s115: { //免费专车
        id: -1,
        tip: ''
      }
    },
    reportData: {
      active: 0,
      visitId: 0,
      visitDetailId: 0,
      visitText: '',
      lng: null,
      lat: null,
      carNo: '',
      specialCarTime: null,
      visitBusAddress: ''
    },
    timevisible: false,
    busvisible: false,
    houseServiceIds: '',
    busAddress: [],
    minDate: new Date().getTime(),
    currentDate: new Date().getTime()
  },
  attached() {
    // this.getDetailForReport();
    this.getvisitlist().then(() => {
      if (this.data.service.s114.id > 0)
        this.getbuilding_listcar(this.data.service.s114.id);
    });
    this.setData({
      address: {
        detail: app.appData.location.province + app.appData.location.city + app.appData.location.street
      }
    })

    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      this.setData({
        active: data.data.active,
        reportData: data.data
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getbuilding_listcar(id) {
      return wx.request({
        url: api.getbuilding_listcar,
        method: "POST",
        data: {
          id: id
        },
        success: (res) => {
          if (res.data.code == 1) {
            this.setData({
              busAddress: res.data.content
            })
          }
        }
      })
    },
    getvisitlist() {
      return new Promise((resolve, reject) => {
        wx.request({
          url: api.getservicelist,
          method: "POST",
          data: {
            id: this.data.buildingid
          },
          success: (res) => {
            if (res.data.code == 1) {
              var service = {

              }
              var buildingGroupName = '';
              res.data.content.forEach(item => {
                var key = 's' + item.visitTypeId;
                service[key] = {
                  id: item.id,
                  tip: item.content
                }
                buildingGroupName = item.buildingGroupName;
              })

              this.setData({
                service: service,
                buildingGroupName: buildingGroupName
              })
            }
            resolve();
          },
          fail: () => {
            reject();
          }
        })
      })
    },
    getDetailForReport() {
      wx.request({
        url: api.detailforreport,
        method: "POST",
        data: {
          id: this.data.buildingid
        },
        success: (res) => {
          if (res.data.code == 1) {
            this.setData({
              houseServiceIds: res.data.content.houseServiceIds
            })
          }
        },
        fail: () => {

        }
      })
    },
    showtime() {
      this.setData({
        timevisible: true
      })
    },
    close_time_popup() {
      this.setData({
        timevisible: false
      })
    },
    time_confirm(e) {
      this.setData({
        ['reportData.specialCarTime']: e.detail,
        timevisible: false
      })
    },
    showbus() {
      this.setData({
        busvisible: true
      })
    },
    close_bus_popup() {
      this.setData({
        busvisible: false
      })
    },
    bus_confirm_handle(e) {
      this.setData({
        busvisible: false,
        ['reportData.visitDetailId']: e.detail.value.id,
        ['reportData.visitText']: '免费班车',
        ['reportData.visitBusAddress']: e.detail.value.address
      })
    },
    carNO_confirm_handle(e) {
      this.setData({
        ['reportData.carNo']: e.detail.value
      })
    },
    tabs_change_handle(e) {
      this.setData({
        active: e.detail.index,
        ['reportData.visitText']: e.detail.title
      })
    },
    report_click_handle(e) {
      if (this.data.active == 0) {
        if (!this.data.reportData.carNo) {
          wx.showModal({
            title: '消息',
            content: '请输入您的车牌号',
          })
          return;
        }
        this.data.reportData.visitId = this.data.service.s113.id;
        this.data.reportData.visitText = '自驾看房';
      } else if (this.data.active == 1) {
        if (!this.data.reportData.specialCarTime) {
          wx.showModal({
            title: '消息',
            content: '请选择您的出发时间！',
          })
          return;
        }
        this.data.reportData.visitId = this.data.service.s115.id;
        this.data.reportData.visitText = '免费专车';
      } else if (this.data.active == 2) {
        if (!this.data.reportData.visitDetailId) {
          wx.showModal({
            title: '消息',
            content: '请选择您的乘车地点！',
          })
          return;
        }
        this.data.reportData.visitId = this.data.service.s114.id;
        this.data.reportData.visitText = '免费班车';
      }
      this.data.reportData.active = this.data.active;

      if (this.data.sureRedirect) {
        wx.navigateTo({
          url: "/pages/shop/detail/detail_report/index?buildingId=" + this.data.buildingId,
          success: (res) => {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', {
              data: this.data.reportData
            })
          }
        })
      } else {
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit("report", this.data.reportData);
      }
    }
  }
})