import { DataCb, Source } from './index'

export function localSource<T = any>(): Source<T> {
  const channels: Record<string, BroadcastChannel> = {}

  function getChannel(key: string): BroadcastChannel {
    if (channels[key]) return channels[key]
    const newChannel = new BroadcastChannel(key)
    channels[key] = newChannel
    return newChannel
  }

  function sendData(key: string, data: T) {
    const channel = getChannel(key)
    channel.postMessage(data)
  }

  function onData(key: string, cb: DataCb<T>) {
    const channel = getChannel(key)
    channel.onmessage = (ev) => void cb(ev.data)
  }
  return { sendData, onData }
}
