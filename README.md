# use-synced-state


[![NPM](https://img.shields.io/npm/v/use-synced-state.svg)](https://www.npmjs.com/package/use-synced-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## What is this?

Ever needed to sync a state between two instances of a React app? Well, you and I have something in common, not everyone has ever needed to do shit like this!

Anyway, this is a simple hook that allows you to create a state/setter that will be immediatly synced to a local/remote source via `BroadcastChannel` (local) or `Firebase` (remote), or any sync method you like!

When creating a hook you need to provide a source: an object with `onData` and `sendData`, but worry not! a source generator for `BroadcastChannel` and `Firebase` is provided with the library, who would have thought???

You can use a hook as `receiver`, as `sender` or as `both` (default) in order to limit a component to mimic another state, or for the synchronization to work both ways.
## Install

```bash
npm install --save use-synced-state
```

## Usage

Local source, two end sync:
```tsx
import * as React from 'react'

import { useSyncedState, localSource } from 'use-synced-state'

const source = localSource()
const App = () => {
  const [value, setValue] = useSyncedState('counter', altSource, 1)
  return (
    <div onClick={() => setValue(value + 1)}{value}</div>
  )
}
export default App
```

Remote source, one direction sync:
```tsx
import * as React from 'react'

import { useSyncedState, firebaseSource } from 'use-synced-state'

const firebaseConfig = {
  apiKey: 'whatanapikey',
  authDomain: 'maronn.firebaseapp.com',
  databaseURL: 'https://maronn-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'maronn',
  storageBucket: 'maronn.appspot.com',
  messagingSenderId: '100000000',
  appId: '1:123:456',
  measurementId: 'hoooge',
}

const source = firebaseSource(firebaseConfig, 'databaseName')
const role = window.location.hash === '#receiver' ? 'receiver' : 'sender'
const App = () => {
  const [value, setValue] = useSyncedState('counter', altSource, 1, role)
  return (
    <div onClick={() => setValue(value + 1)}{value}</div>
  )
}
export default App
```


## License

MIT © [lucamattiazzi](https://github.com/lucamattiazzi)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
