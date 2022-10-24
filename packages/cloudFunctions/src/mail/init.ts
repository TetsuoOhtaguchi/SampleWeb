import * as nodemailer from 'nodemailer'
import { SendMailOptions } from 'nodemailer'

/**
 * メールをセット
 */
const mailTransport = nodemailer.createTransport({
  host: 'smtp6.gmoserver.jp',
  port: 587,
  secure: false, // SSL
  auth: {
    /**
     * ! 確認 .bizの記入は以下で問題ないのか？
     */
    // user: 'info@t.ohtaguchi.biz',
    /**
     * ! 確認 .passは何の値（英数字8桁）をセットするのか？
     */
    // pass: 'XXXXXXXX',
  }
})

/**
 * メール送信
 * @param options
 * @returns
 */
export const sendMail = (options: SendMailOptions): Promise<'success'> => {
  return new Promise((resolve, reject) => {
    mailTransport.sendMail(options, (err, info) => {
      if (err) return reject(err)
      resolve('success')
    })
  })
}
