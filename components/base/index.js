// 组件基类，所有组件都套用此模板，页面显示权限逻辑在此设置
import api from '../../utils/api.js'
const app = getApp();
Component({
  properties: {
    // 是否必须登录
    mustLogin: {
      type: Boolean,
      value: false,
    },
    loading: {
      type: String,
      value: "page"
    }
  },
  data: {
    pageloaded: false,
    msg: '',
    wxauthed: -1,
    userinfo: {}
  },
  attached() {
    this.getwxsettings().then((authed) => {
      if (authed) {
        this.setData({
          wxauthed: 1
        })
        var tabbar = this.getTabBar();
        if (tabbar) {
          tabbar.setData({
            show: true
          })
        }

        this.checklogin();
      } else {
        this.setData({
          wxauthed: 0
        })
      }
    });
  },
  methods: {
    async checklogin() {
      if (app.appData.userInfo) {
        if (!app.appData.userInfo["sync"]) {
          var userinfores = await this.getuserinfo(app.appData.userInfo);
          if (userinfores && userinfores.data.code == 1) {
            this.setLogin(userinfores.data.content.account);
            this.triggerEvent('pageloaded', "");
            app.connect();
          }
        } else {
          this.triggerEvent('pageloaded', "");
          app.connect();
        }
        return;
      }
      var wxloginres = await this.wxlogin();
      //微信授权---------|未授权，通过wx.login获取code顺便授权，然后获取信息
      if (wxloginres && wxloginres.code) { //利用微信用户信息登录
        var ures = await this.getwxuserinfo();
        if (ures && ures.rawData) {
          var userinfo = JSON.parse(ures.rawData);
          var loginres = await this.login({
            code: wxloginres.code,
            avatar: userinfo.avatarUrl,
            sex: userinfo.gender,
            nickName: userinfo.nickName,
            inviteId: 0
          });
          if (loginres && loginres.data && loginres.data.code) { //登录成功
            this.setLogin(loginres.data.content.yyAccount);
            this.connect();
            this.triggerEvent('pageloaded', "");
          }
        }
      }
    },
    setLogin(userinfo) {
      var logininfo = {
        id: userinfo.id,
        name: userinfo.yyUser.userName,
        avatar: userinfo.yyUser.avatar,
        loginToken: userinfo.loginToken,
        roles: userinfo.roles,
        type: userinfo.type,
        inviteId: userinfo.inviteId,
        inviteImg: userinfo.inviteImg,
        phone: userinfo.hiddenPhone,
        wxAccount: '',
        sync: true
      }
      if (userinfo.company) {
        this.setData({
          companyName: userinfo.company.companyname,
          provinceName: userinfo.company.province.name,
          cityName: userinfo.company.city.name,
          districtName: userinfo.company.district.name
        })
      }
      app.setLogin(logininfo);
    },
    //账户登录
    login(params) {
      return new Promise((reslove, reject) => {
        wx.request({
          url: api.login,
          method: 'POST',
          data: {
            code: params.code,
            avatar: params.avatar,
            inviteId: params.inviteId || 0,
            nickName: params.nickName,
            sex: params.sex
          },
          success(res) {
            reslove(res)
          },
          fail() {
            reslove(null);
          }
        })
      })
    },
    //判断微信是否授权
    getwxsettings() {
      return new Promise((reslove, reject) => {
        wx.getSetting({
          success(res) {
            if (res && res.authSetting["scope.userInfo"]) {
              reslove(true);
            } else {
              reslove(false);
            }
          },
          fail(error) {
            reslove(false);
          }
        })
      })
    },
    //获取微信用户信息
    getwxuserinfo() {
      return new Promise((reslove, reject) => {
        wx.getUserInfo({
          success(res) {
            reslove(res);
          },
          fail(error) {
            reslove(null);
          }
        })
      })
    },
    //微信登录
    wxlogin() {
      return new Promise((reslove, reject) => {
        wx.login({
          success(res) {
            reslove(res);
          },
          fail(error) {
            reslove(null);
          }
        })
      })
    },
    //获取用户信息
    getuserinfo(userinfo) {
      return new Promise((reslove, reject) => {
        wx.request({
          url: api.getuserinfo,
          method: 'POST',
          data: {
            accountId: userinfo.id,
            loginToken: userinfo.loginToken
          },
          success(res) {
            reslove(res)
          },
          fail(error) {
            reslove(null);
          }
        })
      })
    },
    //获取微信用户信息
    wxauthcallback(e) {
      if (e.detail && e.detail.rawData) {
        this.setData({
          wxauthed: 1
        })
        this.checklogin();
      }
    }
  }
})