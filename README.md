# Solid Typer

A component that offers a customisable text-typing animation for Solid.js. [View live example](https://solid-typer.netlify.app).

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

const MatrixExample: Component<{ callback: () => void }> = ({ callback }) => {
  return (
    <p class={styles.typer}>
      <SolidTyper
        text={[
          "Wake up, Neo...",
          "The Matrix has you...",
          "Follow the white rabbit.",
          "Knock, knock, Neo.",
        ]}
        backspaceSpeed={30}
        typingSpeed={100}
        onFinish={callback}
      />
    </p>
  );
};

export default MatrixExample;
```

## Customisation Options
You can provide the SolidTyper component with a variety of props that customise the typing animation. These props are defined by the `TyperProps` interface. The options include: 
-  **className** - An optional CSS class that wraps all the text.
-  **style** - An optional style object to pass directly to the outer span.
-  **cursorClassName** - A class that is used to style the cursor.
-  **text** - A word/sentence or a group of words/sentences that get typed out.
-  **loop** - Control whether the typing animation occurs once or continuosly.
-  **cursor** - Control whether or not to show the cursor.
-  **startDelay** - An optional amount of time to wait before the animation starts.
-  **typingSpeed** - The speed at which the cursor types text forward.
-  **backspaceSpeed** - The speed at which the cursor deletes text.
-  **typingPause** - A time to pause before beginning to type.
-  **backspacePause** - A time to pause before beginning to backspace.
-  **onTypingEnd** - A method which can be called when the typing reaches the end of the line.
-  **onBackspaceEnd** - A method which can be called when the backspace typing reaches the beginning of the line.
-  **onFinish** - A method from the parent component to call when the typing animation is finished.

### Cursor Styling
If you choose to use the cursor it is highly recommended to style it with a blinking animation to make it look like a realistic cursor. Here is a basic example. Define the following in a CSS file. 
```css
@keyframes blink {
  50% {
    opacity: 1;
  }
}

.cursor {
  opacity: 0;
  animation: blink 800ms steps(1) infinite;
  animation-delay: 100ms;
}
```

Then apply "cursor" to the `cursorClassName` prop as follows: 
```jsx
<SolidTyper text="Hello World" cursor cursorClassName="cursor" />
```

### Collaboration
This is the first npm package I have created. I would love to have people collaborate on this project to make it a great package for Solid.js devs to use for adding text-typing animations to web apps. Feel free to fork and create pull requests. 

Connect with me on Twitter [@still_scripts](https://twitter.com/still_scripts)
