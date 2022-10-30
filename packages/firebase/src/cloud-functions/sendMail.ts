import { functions } from '../index'
import { httpsCallable } from 'firebase/functions'

import { SendMailOptions } from 'nodemailer'

export const cfSendMail = async (
  optinos: SendMailOptions
): Promise<'success'> => {
  const sendMail = httpsCallable(functions, 'sendMail')
  const res = await sendMail(optinos)
  return res.data as 'success'
}
