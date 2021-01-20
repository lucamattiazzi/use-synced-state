import React from 'react'

import { useClonedState, localSource } from 'use-cloned-state'

const source = localSource('maronn')

const App = () => {
  const [value, setValue] = useClonedState(source, 1)
  return <div onClick={() => setValue(value + 1)}>{value}</div>
}
export default App
