import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp(functions.config().firebase)

// 環境変数を設定
process.env.TZ = 'Asia/Tokyo' // *new Date()は変わらないが、new Date().getMinutes()などの場合に日本時間で取得できる

/**
 * ! 確認 メモ：同ディレクトリのpackage.jsonのbuildはどの項目を記入するのか？また、外側のpackage.jsonのbuildコマンドの記入は、
 * ! "build:cloudfn": "npm run build -w=@3sw/cloudfn"のみで良いのか？
 */
