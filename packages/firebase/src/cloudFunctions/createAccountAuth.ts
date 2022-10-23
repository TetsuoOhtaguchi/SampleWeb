import { functions } from '../index'
import { httpsCallable } from 'firebase/functions'

export const cfCreateAccountAuth = async (email: string): Promise<string> => {
  const createAccountAuth = httpsCallable(functions, 'createAccountAuth')
  const res = await createAccountAuth(email)

  if (typeof res.data === 'object') {
    console.log(res.data)
    throw new Error('失敗')
  }

  return res.data as string
}
