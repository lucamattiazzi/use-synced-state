import firebase from 'firebase'
import { DataCb, Source } from './index'

let conn: firebase.app.App

export function firebaseSource<T = any>(firebaseConfig: Object, dbName: string): Source<T> {
  conn = conn || firebase.initializeApp(firebaseConfig)
  const db = conn.database().ref(dbName)
  function sendData(data: T) {
    db.push(data)
  }
  function onData(cb: DataCb<T>) {
    db.off()
    db.limitToLast(1).on('child_added', (e) => void cb(e.val()))
  }
  return { sendData, onData }
}
