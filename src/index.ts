import { useState } from 'react'
import { localSource } from './broadcast'
import { firebaseSource } from './firebase'

const ROLES = ['receiver', 'sender', 'both'] as const

type Roles = typeof ROLES[number]

export type DataCb<T = any> = (d: T) => void

export type Source<T> = {
  onData: (key: string, cb: DataCb<T>) => void
  sendData: (key: string, data: T) => void
}

function useSyncedState<T>(
  key: string,
  source: Source<T>,
  baseValue: T | null = null,
  role: Roles = 'both',
) {
  const [value, setValue] = useState<T | null>(baseValue)

  const isSender = role === 'sender' || role === 'both'
  const isReceiver = role === 'receiver' || role === 'both'

  if (isReceiver) source.onData(key, (d) => setValue(d))

  function setData(newVal: T) {
    setValue(newVal)
    if (isSender) source.sendData(key, newVal)
  }

  return [value, setData]
}

export { localSource, firebaseSource, useSyncedState }
