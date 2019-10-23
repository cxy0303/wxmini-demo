// components/pages/shop/detail/detail_report/main/index.js
import api from '../../../../../../utils/api.js'
var wxcrypto = require('../../../../../../utils/cropto/wx.js');
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    buildingId: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    reportlist: [{ //报备楼盘信息，至少一条，即当前buldingId对应信息
      buildingGroupId: 0,
      buildingGroupName: '',
      visitTime: null,
      oneself: null,
      reportRemark: '无',
      mustFullPhone: false
    }],
    serviceData: { //看房服务
      active: 0,
      visitId: 0,
      visitText: '',
      lng: null,
      lat: null,
      carNo: '',
      specialCarTime: null,
      visitDetailId: 0,
      visitBusAddress: ''
    },
    name: '',
    gender: '1',
    remark: '',
    num: null,
    mustFull: false, //是否必须全号报备
    isHidden: false, //是否隐号报备
    houseServiceIds: null,
    phone: [null, null, null, null, null, null, null, null, null, null, null, ],
    timevisible: false,
    timeindex: 0,
    minDate: new Date().getTime(),
    visitTime: new Date().getTime(),
    focusIndex: -1,
    isBindPhone: false,
    focusRemark: false,
  },

  attached() {
    this.getdetailReport();
    // this.setData({
    //   isBindPhone: app.appData.userInfo.isBindPhone
    // })
    const eventChannel = this.getOpenerEventChannel();
    if (eventChannel) {
      eventChannel.on('acceptDataFromOpenerPage', (data) => {
        this.setData({
          serviceData: data.data
        })
      })
    }
    if (app.appData.userInfo.type <= 2) {
      wx.setNavigationBarTitle({
        title: "我要看房"
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    remark_blur(e) {
      this.setData({
        focusRemark: false
      })
    },
    remark_input(e) {
      this.setData({
        remark: e.detail.value
      })
    },
    ShowKeyBorad() {
      this.setData({
        focusRemark: true
      })
    },
    gephone(e) {
      if (!app.appData.userInfo || !app.appData.userInfo.sessionKey) {
        wx.showToast({
          title: '登录过期，请重新登录！',
        })
        return;
      }
      console.log(app.appData.userInfo.sessionKey + "===================");

      var cropt = new wxcrypto(app.appData.appId, app.appData.userInfo.sessionKey);
      var phone = cropt.decryptData(e.detail.encryptedData, e.detail.iv).phoneNumber;
      var userInfo = app.appData.userInfo;

      api.wxBindPhone({
        "appType": 5,
        "id": userInfo.id,
        "loginToken": userInfo.loginToken,
        "phone": phone
      }).then((res) => {
        if (res.data.code == 1) {
          this.setData({
            isBindPhone: true
          })
          //刷新登陆数据
          app.appData.userInfo.isBindPhone = true;
          app.setLogin(app.appData.userInfo);
          this.submit_handle();
        } else {
          wx.showModal({
            title: '消息',
            content: res.data.msg,
          })
        }
      })
    },
    remark_input_handel(e) {
      this.setData({
        remark: e.detail.value
      })
    },
    num_input_handle(e) {
      this.setData({
        num: e.detail.value
      })
    },
    name_input_handle(e) {
      this.setData({
        name: e.detail.value
      })
    },
    checkMustFull() {
      var mustfull = false;
      if (app.appData.userInfo.type > 3) {
        mustfull = false;
      }
      this.data.reportlist.forEach((item) => {
        if (item.mustFullPhone || item.mustFullPhone == "true" || item.oneself == 'false') {
          mustfull = true;
          return false;
        }
      })
      this.setData({
        mustFull: mustfull
      })
      return mustfull;
    },
    getdetailReport() {
      this.triggerEvent("pageloaded", "api");
      api.getdetailReport({
        id: this.data.buildingId
      }).then((res) => {
        this.triggerEvent("pageloaded", "");
        if (res.data.code == 1) {
          var content = res.data.content;
          this.setData({
            ['reportlist[0]']: {
              buildingGroupId: this.data.buildingId,
              buildingGroupName: content.name,
              visitTime: null,
              oneself: null,
              reportRemark: content.reportRemark,
              mustFullPhone: content.phoneIsShow
            },
            houseServiceIds: content.houseServiceIds
          })
        }
        this.checkMustFull();
      })
    },
    time_confirm(e) {
      this.setData({
        [`reportlist[${this.data.timeindex}].visitTime`]: e.detail,
        timevisible: false
      })

    },
    close_time_popup() {
      this.setData({
        timevisible: false
      })
    },
    showtime(e) {
      this.setData({
        timevisible: true,
        visitTime: e.currentTarget.dataset.time,
        timeindex: e.currentTarget.dataset.key
      })
    },
    onRadioChange(e) {
      var item = 'reportlist[' + e.currentTarget.dataset.key + '].oneself';
      this.setData({
        [item]: e.detail
      })
      this.checkMustFull();
    },
    report_handle(e) {
      wx.navigateTo({
        url: '/pages/shop/detail/detail_building_select/index?buildingId=' + this.data.buildingId,
        events: {
          sure: (data) => {
            this.setData({
              reportlist: data
            })
            this.checkMustFull();
            wx.navigateBack({
              delta: 1
            })
          }
        },
        success: (res) => {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            data: this.data.reportlist
          })
        }
      })
    },
    gender_handle(e) {
      this.setData({
        gender: e.detail
      })
    },
    switch_handle(e) {
      this.setData({
        isHidden: !this.data.isHidden
      })
    },
    input_handle(e) {
      var index = this.data.focusIndex;
      var value = '';
      if (e.detail.keyCode == 8) { //回退按钮
        if (this.data.isHidden && !this.data.mustFull && index == 7) {
          index = 2;
        } else {
          index--;
        }
      } else {
        value = e.detail.value[e.detail.value.length - 1];
        if (this.data.isHidden && !this.data.mustFull && index == 2) {
          index = 7;
        } else {
          index++;
        }
      }


      this.setData({
        [`phone[${this.data.focusIndex}]`]: value,
        focusIndex: index
      })
    },
    custome_input_handle(e) {
      var key = e.currentTarget.dataset.key;
      if (this.data.isHidden && !this.data.mustFull && key > 2 && key < 7) {
        return;
      }
      this.setData({
        focusIndex: key
      });
    },
    blur_handle(e) {
      this.setData({
        focusIndex: -1
      });
    },
    houseservice_handle(e) {
      wx.navigateTo({
        url: '/pages/shop/detail/detail_service/index?buildingid=' + this.data.buildingId,
        events: {
          report: (data) => {
            this.setData({
              serviceData: data
            })
            wx.navigateBack({
              delta: 1
            })
          }
        },
        success: (res) => {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            data: this.data.serviceData
          })
        }
      })
    },
    submit_handle(e) {
      var submitdata = {
        "accountId": app.appData.userInfo.id,
        "firstId": this.data.reportlist[0].buildingGroupId,
        "firstTakeLook": this.data.reportlist[0].oneself,
        "firstVisitTime": this.data.reportlist[0].visitTime,
        "secondId": 0,
        "secondTakeLook": null,
        "secondVisitTime": "",
        "thirdId": 0,
        "thirdTakeLook": null,
        "thirdVisitTime": "",

        "lat": app.appData.location.lat,
        "lng": app.appData.location.lng,
        "phone": this.data.phone.join(''),
        "remark": this.data.remark,

        "username": this.data.name,
        "sex": this.data.gender,
        "shareAccountId": 0,
        "visitorNum": this.data.num,

        "specialCarTime": this.data.serviceData.specialCarTime,
        "carNo": this.data.serviceData.carNo,
        "visitDetailId": this.data.serviceData.visitDetailId,
        "visitId": this.data.serviceData.visitId,
      }

      if (!submitdata.username) {
        wx.showModal({
          title: '消息',
          content: '请输入客户姓名',
        })
        return;
      }

      if (this.checkMustFull() && !/^1[0-9]{10}$/.test(submitdata.phone)) {
        wx.showModal({
          title: '消息',
          content: '请输入有效的手机号码',
        })
        return;
      } else if (!/^1[0-9]{2}\*{4}[0-9]{4}$/.test(submitdata.phone) && !/^1[0-9]{10}$/.test(submitdata.phone)) {
        wx.showModal({
          title: '消息',
          content: '请输入有效的手机号码',
        })
        return;
      }

      if (this.data.isHidden) {
        submitdata.phone = submitdata.phone.substring(0, 2) + '****' + submitdata.phone.substring(7, 10)
      }

      if (!submitdata.visitorNum) {
        wx.showModal({
          title: '消息',
          content: '请输入到访人数',
        })
        return;
      }

      if (submitdata.firstTakeLook == null) {
        wx.showModal({
          title: '消息',
          content: `请选择是否本人带看！ `,
        })
        return;
      }

      if (this.data.reportlist.length >= 2) {
        var item = this.data.reportlist[1];
        submitdata.secondId = item.visitId;
        submitdata.secondTakeLook = item.oneself;
        submitdata.secondVisitTime = item.visitTime;
        if (submitdata.secondTakeLook == null) {
          wx.showModal({
            title: '消息',
            content: `楼盘 [${item.buildingGroupName}] 请选择是否本人带看！ `,
          })
          return;
        }
      }

      if (this.data.reportlist.length >= 3) {
        var item = this.data.reportlist[2];
        submitdata.thirdId = item.visitId;
        submitdata.thirdTakeLook = item.oneself;
        submitdata.thirdVisitTime = item.visitTime;
        if (submitdata.thirdTakeLook == null) {
          wx.showModal({
            title: '消息',
            content: `楼盘 [${item.buildingGroupName}] 请选择是否本人带看！ `,
          })
          return;
        }
      }

      api.submitReport(submitdata).then((res) => {
        if (res.data.code == 1) {
          wx.showToast({
            title: '报备成功',
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        } else {
          wx.showModal({
            title: '消息',
            content: res.data.msg,
          })
        }
      })
    }
  }
})