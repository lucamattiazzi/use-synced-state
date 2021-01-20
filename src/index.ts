import { useState } from 'react'
import { localSource } from './broadcast'
import { firebaseSource } from './firebase'

const ROLES = ['receiver', 'sender', 'both'] as const

type Roles = typeof ROLES[number]

export type DataCb<T = any> = (d: T) => void

export type Source<T> = {
  onData: (cb: DataCb<T>) => void
  sendData: DataCb<T>
}

export function useClonedState<T>(
  source: Source<T>,
  baseValue: T | null = null,
  role: Roles = 'both',
) {
  const [value, setValue] = useState<T | null>(baseValue)
  if (role !== 'sender') source.onData((d) => setValue(d))
  function setData(newVal: T) {
    setValue(newVal)
    if (role !== 'receiver') source.sendData(newVal)
  }
  return [value, setData]
}

export { localSource, firebaseSource }
