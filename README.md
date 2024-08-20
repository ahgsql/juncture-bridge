# Juncture Bridge

Juncture Bridge is a TypeScript module that facilitates communication between React frontend and Node.js backend applications. It works in conjunction with the juncture-server library to provide graphical user interfaces for Node.js apps.

## Features

- Real-time communication using Socket.IO
- TypeScript support
- Can be used in both JavaScript and TypeScript projects
- Supports both import and require syntax
- Seamless integration with React and juncture-server

## Installation

```bash
npm install juncture-bridge
```

For server-side integration, also install juncture-server:

```bash
npm install juncture-server
```

## Basic Usage

### Frontend (React)

First, create a bridge instance:

```javascript
// utils/bridge.js
import ReactBridge from "juncture-bridge";

const bridge = new ReactBridge("http://localhost:3000");
export default bridge;
```

Then, use the bridge in your React components:

```jsx
import React, { useState, useEffect } from 'react';
import bridge from "../utils/bridge";

function App() {
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);

  const handleGreet = () => {
    bridge.execute("greet", { name: "World" })
      .then(setMessage)
      .catch(console.error);
  };

  const handleCount = () => {
    bridge.execute("count", { to: 5 })
      .then(console.log)
      .catch(console.error);
  };

  useEffect(() => {
    bridge.on("countUpdate", (data) => {
      setCount(data);
    });

    bridge.on("stateUpdate", (newState) => {
      setMessage(newState.message);
      setCount(newState.count);
    });

    return () => {
      bridge.off("countUpdate");
      bridge.off("stateUpdate");
    };
  }, []);

  return (
    <div>
      <button onClick={handleGreet}>Greet</button>
      <p>{message}</p>
      <button onClick={handleCount}>Start Counting</button>
      <p>Current count: {count}</p>
    </div>
  );
}

export default App;
```

## API

### `ReactBridge`

#### Constructor

```typescript
new ReactBridge(url: string)
```

- `url`: The URL of the Juncture server

#### Methods

- `execute(command: string, args: any): Promise<any>`: Executes a command on the server
- `on(event: string, callback: (data: any) => void, done: () => void)`: Listens for an event
- `off(event: string)`: Stops listening for an event

## Related Projects

For server-side implementation, check out [juncture-server](https://github.com/ahgsql/juncture-server).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

[ahgsql](https://github.com/ahgsql)

## Issues

If you encounter any problems or have any suggestions, please [open an issue](https://github.com/ahgsql/juncture-bridge/issues) on GitHub.

## Homepage

For more information, visit the [Juncture Bridge homepage](https://github.com/ahgsql/juncture-bridge#readme).