# Solid Typer

A component that offers a customisable text-typing animation for Solid.js.

More Documentation coming soon...

## Getting Started

### Install the component

```sh
> npm i solid-typer
or
> yarn add solid-typer
```

Install `solid-typer`, then use it your Solid.js app as follows:

```jsx
import type { Component } from "solid-js";
import { SolidTyper } from "solid-typer";

const TextTypingExample: Component = () => {
  return (
    <SolidTyper
      style={{ color: "yellow" }}
      text={["Hello", "this", "text", "is", "yellow"]}
      cursor
      loop
    />
  );
};

export default TextTypingExample;
```
