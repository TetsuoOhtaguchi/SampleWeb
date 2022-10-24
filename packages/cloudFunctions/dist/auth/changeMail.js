"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeMail = void 0;
const functions = require("firebase-functions");
const firebase_functions_1 = require("firebase-functions");
const admin = require("firebase-admin");
/**
 * メールアドレスの変更
 * @param {*} option { uid: string; mail: string }
 * @returns string
 */
exports.changeMail = functions
    .region('asia-northeast1')
    .https.onCall(async (option, context) => {
    try {
        const res = await admin.auth().updateUser(option.uid, {
            email: option.mail
        });
        return res.uid;
    }
    catch (err) {
        return new firebase_functions_1.https.HttpsError('aborted', err.codePrefix, err);
    }
});
//# sourceMappingURL=changeMail.js.map