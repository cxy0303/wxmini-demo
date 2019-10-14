const Base64 = require('./alioss/base64.js');
const Crypto = require('./alioss/crypto.js');

const aliOSS = {
  accessKeyID: 'LTAIZYdBs6Q8SQTP',
  accessKeySecret: 'jNH10QdGGjrL32CxbQYoSNzey7Iw3A',
  host: 'https://jrfw-image.oss-cn-shanghai.aliyuncs.com',
  timeout: 87600,
};

export function uploadFile(filePath) {
  return new Promise(function(resolve, reject) {

    if (!filePath) {
      reject({
        status: false,
        err: '文件错误',
      });
      return;
    }

    //文件后缀
    let dotIndex = filePath.lastIndexOf('.');
    let filePathLength = filePath.length;
    let suffix = filePath.substring(dotIndex, filePathLength);

    const aliyunFileKey = (new Date().getTime()) + '.' + suffix;
    const aliyunServerURL = aliOSS.host;
    const accessid = aliOSS.accessKeyID;
    const policyBase64 = Base64.encode(JSON.stringify({
      "expiration": new Date(new Date().getTime() + aliOSS.timeout).toISOString(),
      "conditions": [
        ["content-length-range", 0, 1024 * 1024 * 10] //10m
      ]
    }));
    let bytes = Crypto.util.HMAC(Crypto.util.SHA1, policyBase64, aliOSS.accessKeySecret, {
      asBytes: true
    });
    const signature = Crypto.util.bytesToBase64(bytes);

    wx.uploadFile({
      url: aliyunServerURL,
      filePath: filePath,
      name: 'file',
      formData: {
        'key': aliyunFileKey,
        'OSSAccessKeyId': aliOSS.accessKeyID,
        'policy': policyBase64,
        'Signature': signature,
        'success_action_status': '200'
      },
      success: function(res) {
        console.log(res);
        if (res.errMsg === 'uploadFile:ok') {
          let url =  'http://img.jrfw360.com/' + aliyunFileKey;
          resolve({
            status: true,
            data: {
              url,
            },
            err: '',
          });
        }
      },
      fail: function(err) {
        reject({
          status: false,
          err,
        });
      },
    })
  });
}