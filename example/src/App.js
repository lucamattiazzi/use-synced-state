import React from 'react'

import { useSyncState, localSource } from 'use-sync-state'

const source = localSource()

const App = () => {
  const [value, setValue] = useSyncState('test', source, 1)
  return <div onClick={() => setValue(value + 1)}>{value}</div>
}
export default App
