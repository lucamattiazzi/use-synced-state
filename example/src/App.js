import React from 'react'

import { useSyncedState, localSource } from 'use-synced-state'

const source = localSource()

const App = () => {
  const [value, setValue] = useSyncedState('test', source, 1)
  return <div onClick={() => setValue(value + 1)}>{value}</div>
}
export default App
