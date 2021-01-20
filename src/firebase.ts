import firebase from 'firebase'
import { DataCb, Source } from './index'

let conn: firebase.app.App

const VALUE_KEY = 'value'

export function firebaseSource<T = any>(firebaseConfig: Object, dbName: string): Source<T> {
  conn = conn || firebase.initializeApp(firebaseConfig)
  const db = conn.database().ref(dbName)
  function sendData(key: string, data: T) {
    db.child(key).child(VALUE_KEY).set(data)
  }
  function onData(key: string, cb: DataCb<T>) {
    db.off()
    db.child(key).on('child_added', (e) => void cb(e.val()))
  }
  return { sendData, onData }
}
