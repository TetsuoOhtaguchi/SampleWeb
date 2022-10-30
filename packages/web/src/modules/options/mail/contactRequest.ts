import { cfSendMail } from '@sw/firebase'
import { ContactType } from '@sw/types'

/**
 * お問合せメールを送信する
 */
export const contactRequest = async (data: ContactType) => {
  const res = await cfSendMail({
    from: data.mail,
    to: 't.ohtaguchi@gmail.com',
    subject: 'お問合せ',
    text: `${data.contents}`
  })
  return res
}
