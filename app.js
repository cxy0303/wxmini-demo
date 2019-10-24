import storage from '/utils/storage.js'
var bmap = require('/utils/bmap-wx.min.js');
import api from '/utils/api.js'
App({
  onLaunch: function(options) {
    this.init(options);
  },
  onShow: function(options) {
    if (options.query["shopAccountId"] != this.appData.shopInfo.accountId) {
      this.init(options);
    }
    this.checkupdate();

    // wx.navigateTo({
    //   url: '/pages/shop/order/success/index',
    // })
  },
  checkupdate() {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

  },
  init(options) {
    if (options.query["shopAccountId"]) {
      this.appData.shopInfo.accountId = options.query.shopAccountId;
    } else {
      this.appData.shopInfo.accountId = 773;
    }

    var userinfo = wx.getStorageSync(storage.keys.userInfo) || null;
    if (userinfo)
      this.setLogin(userinfo);
    this.getlocation();
  },
  getlocation() {
    return api.getLocation((data) => {
      var addressobj = data.originalData.result.addressComponent;
      var location = data.originalData.result.location;
      this.appData.location = {
        cityId: addressobj.adcode,
        province: addressobj.province,
        city: addressobj.city,
        district: addressobj.district,
        street: addressobj.street,
        lat: location.lat,
        lng: location.lng
      }
      return data;
    })
  },
  setLogin(userinfo) {
    this.appData.userInfo = userinfo;
    if (!this.appData.shopInfo.accountId) {
      this.appData.shopInfo.accountId = userinfo.id;
    }

    wx.setStorageSync(storage.keys.userInfo, this.appData.userInfo)
  },
  refreshQty() {
    var pages = getCurrentPages();
    if (pages && pages.length > 0) {
      var page = pages[0];
      var tab = page.getTabBar();
      if (tab) {
        tab.getTabBar().setData({
          qty: this.appData.tabBarInfo.qty
        })
      }
    }
  },
  //websocket
  connect() {
    var that = this;
    return new Promise((reslove, reject) => {
      let chatInfo = this.appData.chat;
      let socket = this.appData.chat.socketTask;
      if (!chatInfo.connected) {
        this.appData.chat.msglist = [];
        this.getChatMsnList().then((res) => {
          if (res.data.code == 1) {
            socket = wx.connectSocket({
              url: api.socket + "/" + res.data.content.groupId + "/" + this.appData.userInfo.id
            })
            wx.onSocketOpen((res) => {
              this.appData.chat.connected = true;
              this.appData.chat.loadMore = this.getChatMsnList;
              if (this.appData.chat.onConnected) {
                this.appData.chat.onConnected(this.appData.chat.msglist)
              }
              if (chatInfo.timer) {
                clearInterval(chatInfo.timer);
              }
              chatInfo.timer = setInterval(() => {
                this.keepAlive()
              }, 300000);

              reslove(res);
            })
            wx.onSocketMessage((evt) => {
              if (evt.data) {
                let msg = JSON.parse(evt.data);
                this.appData.chat.msglist.push(msg);

                if (msg.accountId != this.appData.userInfo.id) {
                  this.appData.tabBarInfo.qty++;
                  this.refreshQty();
                }
                if (this.appData.chat.onMessage) {
                  this.appData.chat.onMessage(msg);
                }
              }
            })
            wx.onSocketError((res) => {
              this.appData.chat.connected = false;
              this.appData.chat.socket = null;
              this.appData.chat.loadAll = false;
              this.appData.chat.pageIndex = 0;
            })
            wx.onSocketClose((res) => {
              this.appData.chat.connected = false;
              this.appData.chat.socket = null;
              this.appData.chat.loadAll = false;
              this.appData.chat.pageIndex = 0;
            })
          }
        })
      }
    })
  },
  keepAlive() {
    if (this.appData.chat.connected) {
      wx.sendSocketMessage({
        data: ''
      })
    } else {
      this.connect();
    }
  },
  getChatMsnList() {
    return new Promise((resolve, reject) => {
      let userinfo = this.appData.userInfo;
      let shopinfo = this.appData.shopInfo;
      let chatinfo = this.appData.chat;
      if (userinfo.id == shopinfo.accountId) { //自己跟自己聊天忽略
        resolve({
          data: {
            code: -1
          }
        });
        return;
      }
      if (chatinfo.loadAll) {
        if (chatinfo.onLoadAll) {
          chatinfo.onLoadAll();
        }
        resolve({
          data: {
            code: -1
          }
        });
        return;
      }
      let data = {
        'accountId': userinfo.id,
        'loginToken': userinfo.loginToken,
        'otherAccountId': shopinfo.accountId,
        'pageNo': 1,
        'pageSize': 10
      }
      // let data = {
      //   'accountId': 146,
      //   'loginToken': userinfo.loginToken,
      //   'groupId': 452,
      //   'pageNo': chatinfo.pageIndex + 1,
      //   'pageSize': chatinfo.pageSize
      // }
      api.getChatMsnList(data).then((res) => {
        if (res.data.code == 1) {
          let content = res.data.content;
          chatinfo.groupId = content.groupId;
          chatinfo.loadAll = content.msnList.length < chatinfo.pageSize;
          chatinfo.msglist.splice(0, 0, ...content.msnList);
          if (chatinfo.onMessage)
            chatinfo.onMessage(chatinfo.msglist);
          if (chatinfo.loadAll && chatinfo.onLoadAll) {
            chatinfo.onLoadAll();
          }
          chatinfo.pageIndex++;
          resolve(res);
        }
      })
    })
  },
  appData: {
    appId: 'wxad1973038b18c4c3',
    bMap_Key: "uP9sskI3WPQEW7MglaOLTosK4k12rG7h",
    sync: false,
    userInfo: null,
    shopInfo: {
      accountId: 0,
      name: '',
      companyName: ''
    },
    location: {
      cityId: 0,
      province: '上海',
      city: '上海市',
      district: '',
      street: '',
      lat: 0,
      lng: 0
    },
    chat: {
      connected: false,
      socketTask: null,
      groupId: 0,
      msglist: [],
      onMessage: null,
      onConnected: null,
      onLoadAll: null,
      loadMore: null,
      pageIndex: 0,
      pageSize: 10,
      loadAll: false,
      timer: null
    },
    // userInfo: {
    //   'id': 146,
    //   'phone': '',
    //   'name': '戏子•辰',
    //   'avatar': 'http://img.jrfw360.com/usertrend/image1557469080554.jpg',
    //   'loginToken': '5c07bd525e42aa92da621345f7217b08041e1592',
    //   'phone': '176****9486',
    //   'type': 8,
    //   'roles': 4,
    //   companyName: '',
    //   provinceName: '',
    //   cityName: '',
    //   districtName: '',
    //   wxAccount: '',
    //   'authenticationFlag': 1
    // },
    tabBarInfo: {
      qty: 0,
      active: 'home'
    }
  }
})