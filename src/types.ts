import { JSX } from "solid-js";

export type TypewriterDirection = "forward" | "backward";

export interface TyperProps {
  // Styling
  className?: string; // The outer class that wraps all the text.
  style?: JSX.CSSProperties; // An optional style object to pass directly to the outer span.
  cursorClassName?: string; // A className that is passed to the cursor

  // Common general parameters
  text: string | string[]; // A word/sentence or a group of word/sentences that get typed out.
  loop?: boolean; // Control whether the typing animation occurs once or continuosly.
  cursor?: boolean; // Whether or not to show the cursor
  startDelay?: number; // An optional amount of time to wait before the animation starts.

  // Parameters related to forward and backward typing.
  typingSpeed?: number; // The speed at which the cursor types text forward.
  backspaceSpeed?: number; // The speed at which the cursor deletes text.
  typingPause?: number; // A time to pause before beginning to type
  backspacePause?: number; // A time to pause before backspacing.

  // Methods to call at different times related to
  onTypingEnd?: () => void; // A method which can be called when the typing reaches the end of the line
  onBackspaceEnd?: () => void; // A method which can be called when the backspace typing reaches the beginning of the line
  onFinish?: () => void; // A method from the parent component to call when the typing animation is finished
}