// components/pages/chat/user/main/index.js
import api from '../../../../../utils/api.js'
var app = getApp();
import {
  uploadFile
} from '../../../../../utils/alioss/alioss.js'
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
    viewurl: '',
    playId: ''
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
      this.setData({
        scrollID: `msg_${this.data.msglist[this.data.msglist.length - 1].id}`
      })
    }
    app.appData.chat.onMessage = (data, type) => {
      this.setData({
        msglist: app.appData.chat.msglist
      });

      if (app.appData.chat.pageIndex <= 1) {
        this.setData({
          scrollID: `msg_${this.data.msglist[this.data.msglist.length - 1].id}`
        })
      } else {
        this.setData({
          scrollID: `msg_${this.data.msglist[app.appData.chat.pageSize].id}`
        })
      }
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
    audioClick(e) {
      var cid = e.currentTarget.dataset.key;
      var autio = wx.createAudioContext(cid, this);

      if (cid == this.data.playId) {
        autio.pause();
        this.setData({
          playId: ''
        })
      } else {
        autio.play(cid);
        this.setData({
          playId: cid
        })
      }
    },
    loadMore() {
      app.appData.chat.loadMore();
    },
    chose_img() {
      wx.chooseImage({
        count: 1,
        success: (res) => {
          uploadFile(res.tempFiles[0].path).then((os_res) => {
            this.sendmsg({
              picPath: os_res.data.url,
              targetType: 2
            })
            this.setData({
              showbottom: false
            })
            wx.pageScrollTo({
              scrollTop: 10000
            })
          })
        },
      })
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
    async sendmsg(data) {
      if (!app.appData.chat.connected) {
        await app.connect()
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
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 10000
        })
      }, 100)
    },
    showbottom() {
      this.setData({
        showbottom: !this.data.showbottom
      })
    }
  }
})