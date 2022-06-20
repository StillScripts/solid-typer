# Solid Typer

A component that offers a customisable text-typing animation for Solid.js.

[Live example](https://solid-typer.netlify.app).

## Getting Started

### Install the library

```sh
> npm i solid-typer
or
> yarn add solid-typer
```

### Use the component

Install `solid-typer`, then use it your Solid.js app as follows:

```jsx
import type { Component } from "solid-js";
import { SolidTyper } from "solid-typer";

const TextTypingExample: Component = () => {
  return (
    <p>
      <SolidTyper
        text={[
          "Wake up, Neo...",
          "The Matrix has you...",
          "Follow the white rabbit.",
          "Knock, knock, Neo."
        ]}
        backspaceSpeed={30}
        typingSpeed={100}
        onFinish={callback}
      />
    </p>
  );
};

export default TextTypingExample;
```

More documentation coming soon...

Connect with me on Twitter [@still_scripts](https://twitter.com/still_scripts)
