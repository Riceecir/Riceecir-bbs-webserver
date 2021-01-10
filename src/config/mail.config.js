// 邮箱服务
const nodemailer = require('nodemailer')
// async..await is not allowed in global scope, must use a wrapper
async function main (sendInfo) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '1354073407@qq.com', // generated ethereal user
      pass: 'pxgfqbmieekthdfd' // generated ethereal password
    }
  })

  const info = await transporter.sendMail({
    from: '"Riceecir 认证邮件" <1354073407@qq.com>', // sender address
    to: sendInfo.email,
    subject: '您好, Riceecir 论坛找回密码有效时间为30分钟！', // Subject line
    html: `
      <div>
        <p>您好，找回密码有效时间为30分钟! 请在 ${sendInfo.expire} 前重置您的密码。</p>
        <p>
          <a href="https://www.baidu.com">
            https://www.baidu.com
          </a>
        </p>
      </div>
    `
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  return info.messageId
}

module.exports = main
