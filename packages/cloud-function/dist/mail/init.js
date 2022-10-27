"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer = require("nodemailer");
/**
 * メールをセット
 */
const mailTransport = nodemailer.createTransport({
    host: 'mail1002.onamae.ne.jp',
    port: 587,
    secure: false,
    auth: {
        user: 'sample-web-info@ligto.net',
        pass: 'DJ.ironrock.1202'
    }
});
/**
 * メール送信
 * @param options
 * @returns
 */
const sendMail = (options) => {
    return new Promise((resolve, reject) => {
        mailTransport.sendMail(options, (err, info) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve('success');
        });
    });
};
exports.sendMail = sendMail;
//# sourceMappingURL=init.js.map