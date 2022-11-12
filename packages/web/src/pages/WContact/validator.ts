import { ref } from 'vue'
import * as validator from '@sw/utils'
import { ContactType } from '@sw/types'

export const contactValidator = (data: ContactType) => {
  const isErrorCode = ref<string>('')
  const isErrorMsg = ref<string>('')

  // 氏名
  isErrorCode.value = validator.nameValidator(data.name)
  if (isErrorCode.value === '001') {
    isErrorMsg.value = '※氏名を入力してください'
    return { errorCode: isErrorCode.value, errorMsg: isErrorMsg.value }
  }
  if (isErrorCode.value === '002') {
    isErrorMsg.value =
      '※氏名は全角ひらがな、全角カタカナ、漢字のいずれかで入力してください'
    return { errorCode: isErrorCode.value, errorMsg: isErrorMsg.value }
  }

  // メールアドレス
  isErrorCode.value = validator.mailValidator(data.mail)
  if (isErrorCode.value === '003') {
    isErrorMsg.value = '※メールアドレスを入力してください'
    return { errorCode: isErrorCode.value, errorMsg: isErrorMsg.value }
  }
  if (isErrorCode.value === '004') {
    isErrorMsg.value = '※メールアドレスに誤りがあります'
    return { errorCode: isErrorCode.value, errorMsg: isErrorMsg.value }
  }

  // 電話番号
  isErrorCode.value = validator.phoneNumberValidator(data.tel)
  if (isErrorCode.value === '010') {
    isErrorMsg.value = '※電話番号を入力してください'
    return { errorCode: isErrorCode.value, errorMsg: isErrorMsg.value }
  }
  if (isErrorCode.value === '011') {
    isErrorMsg.value = '※電話番号に誤りがあります'
    return { errorCode: isErrorCode.value, errorMsg: isErrorMsg.value }
  }

  // お問合せ内容
  const contentsNoSpaceText = data.contents.replace(/\s+/g, '')
  if (!validator.checkNotEmpty(contentsNoSpaceText)) {
    return { errorCode: '012', errorMsg: '※お問合せ内容を入力してください' }
  }
  return { errorCode: '', errorMsg: '' }
}
