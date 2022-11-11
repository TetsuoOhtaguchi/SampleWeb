import { cfSendMail } from '@sw/firebase'

/**
 * お問合せ完了メールを送信する
 */
export const contactRequestCompletion = async (email: string) => {
  const res = await cfSendMail({
    from: 'sample-web-info@ligto.net',
    to: email,
    subject: 'お問合せ送信完了',
    text: `お問合せ内容を送信しました。

担当者より順次ご連絡させて頂きます。
ご連絡までお時間が掛かる場合がございます。
予めご了承ください。

尚、こちらのメールは自動送信されておりますので返信出来ません。

■■■■■■■■■■■■■■■■■■■■■■■■■
株式会社 LIG
担当：太田口鉄夫
電話番号：08037402941
■■■■■■■■■■■■■■■■■■■■■■■■■`
  })
  return res
}
