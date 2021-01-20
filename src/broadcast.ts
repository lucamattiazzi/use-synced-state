import { DataCb, Source } from './index'

export function localSource<T = any>(id: string): Source<T> {
  const channel = new BroadcastChannel(id)
  function sendData(data: T) {
    channel.postMessage(data)
  }
  function onData(cb: DataCb<T>) {
    channel.onmessage = (ev) => void cb(ev.data)
  }
  return { sendData, onData }
}
