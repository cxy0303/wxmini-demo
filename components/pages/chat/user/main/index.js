// components/pages/chat/user/main/index.js
import api from '../../../../../utils/api.js'
var app = getApp();
import { uploadFile } from '../../../../../utils/alioss/alioss.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    groupId: 0,
    msglist: [],
    accountId: 146,
    content: '',
    loadAll: false,
    showbottom: false,
    viewurl: ''
  },
  //socket为全局，在用户登录后，并获取聊天信息后，才会和服务器连接，如果小程序直接打开此页面则在连接完毕后，获取消息列表；
  //如果是从其他页面进入，理论socket已经连接，直接设置消息列表；当然也有可能连接比较慢，进入此页面时正在连接，则走上面逻辑；
  attached() {
    // this.setData({
    //   accountId: app.appData.userInfo.id
    // })
    if (app.appData.chat.connected) {
      this.setData({
        msglist: app.appData.chat.msglist
      })
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 10000
        })
      }, 100)
    }
    app.appData.chat.onMessage = () => {
      this.setData({
        msglist: app.appData.chat.msglist
      })
    }
    app.appData.chat.onLoadAll = () => {
      wx.showToast({
        title: '已加载所有记录！',
      })
    }

  },
  /**
   * 组件的方法列表
   */
  methods: {
    chose_img() {
      // console.log(new OSS());
      // wx.chooseImage({
      //   count: 1,
      //   success: function(res) {
      //     wx.showModal({
      //       title: 'test',
      //       content: res.tempFiles[0].path,
      //     })

      //   },
      // })
    },
    view_pic(e) {
      this.setData({
        viewurl: e.currentTarget.dataset.key
      })
    },
    close_pic_view(e) {
      this.setData({
        viewurl: ''
      })
    },
    send(e) {
      if (!e.detail.value) {
        wx.showModal({
          title: '消息',
          content: '发送内容不能为空！',
        })
        return;
      }
      this.sendmsg({
        content: e.detail.value,
        targetType: 1
      })
    },
    sendfile(data) {
      this.sendmsg(data);
    },
    sendmsg(data) {
      if (!app.appData.chat.connected) {
        wx.showModal({
          title: '消息',
          content: '当前已断线，请退出重新打开在尝试！',
        })
        return;
      }
      let msg = {
        'accountId': app.appData.userInfo.id,
        'groupId': app.appData.chat.groupId,
      }
      wx.sendSocketMessage({
        data: JSON.stringify(Object.assign(msg, data))
      })
      this.setData({
        content: ''
      })
    },
    showbottom() {
      this.setData({
        showbottom: !this.data.showbottom
      })
    }
  }
})