import { functions } from '../index'
import { httpsCallable } from 'firebase/functions'

export const cfChangeMail = async (option: {
  uid: string
  mail: string
}): Promise<string> => {
  const changeMail = httpsCallable(functions, 'changeMail')
  const res = await changeMail(option)

  if (typeof res.data === 'object') {
    throw (res.data as any)?.details
  }

  return res.data as string
}
