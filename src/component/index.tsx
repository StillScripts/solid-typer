import { Component, createSignal, onCleanup, onMount, Show } from "solid-js";
import { TyperProps, TypewriterDirection } from "../types";
//import "./styles.css";

/**
 * A text typing animation with a variety of options for customisation
 * @param {TyperProps} props - The props used to customise the typewriter animation
 */
const Typer: Component<TyperProps> = ({
  className,
  style,
  cursorClassName,
  text,
  loop,
  cursor,
  startDelay,
  typingSpeed = 120,
  backspaceSpeed = 70,
  typingPause = 1200,
  backspacePause = 400,
  onTypingEnd,
  onBackspaceEnd,
  onFinish
}: TyperProps) => {
  const singleLine: boolean = typeof text === "string";
  const [currentText, setCurrentText] = createSignal<string>(""); // The current text displayed within the <span>
  const [currentLine, setCurrentLine] = createSignal<string>(""); // The current line selected from the text prop.
  const [currentLineIndex, setCurrentLineIndex] = createSignal<number>(0); // The index number used to select the current line.
  const [direction, setDirection] = createSignal<TypewriterDirection>("forward");

  const [finished, setFinished] = createSignal(false); // Variable for when the typing has finished
  const [paused, setPaused] = createSignal(false);

  onMount(() => {
    // Initialise the current line
    setCurrentLine(typeof text === "string" ? text : text[0]);
    if (startDelay) {
      setTimeout(() => {
        timeLoop(typingSpeed);
      }, startDelay);
    } else {
      timeLoop(typingSpeed);
    }
  });

  onCleanup(() => {
    // Cleanup component to end the loop when it is unmounted
    setFinished(true);
  });

  /**
   * Loop that runs continuously or until the typewrite is finished.
   * @param {number} intervalTime - The time of each timeout interval.
   */
  function timeLoop(intervalTime: number) {
    if (!finished()) {
      // Run timeout interval unless the animation is finished
      setTimeout(() => {
        if (paused()) {
          setPaused(false); // Ensure next interval is not paused
          timeLoop(direction() === "forward" ? backspacePause : typingPause);
        } else {
          typewrite();
          timeLoop(direction() === "forward" ? typingSpeed : backspaceSpeed);
        }
      }, intervalTime);
    } else {
      console.log("Typing finished");
    }
  }

  /**
   * Run the typewriter
   */
  function typewrite() {
    if (direction() === "forward") {
      handleForwardTyping();
    } else {
      handleBackSpace();
    }
  }

  /**
   * A method which checks if the typewriter is at the end of the line and handle this
   * appropriately.
   */
  function handleForwardTyping() {
    // Currently typing forward, so check if it is at the end of the line.
    if (currentText().length === currentLine().length) {
      // The current line is finished, check what needs to be done next.
      if (singleLine || currentLineIndex() + 1 === text.length) {
        // Currently on final line, so loop it or finish...
        if (loop) {
          // Looping so change the direction to backspace typing
          setDirection("backward");
          // Since we have changed direction, we could run a pause here...
          setPaused(true);
        } else {
          setFinished(true);
          onFinish && onFinish();
        }
      } else {
        // It must be in a loop, so we can confidently shift to backspace typing...
        setDirection("backward");
        // Since we have changed direction, we could run a pause here...
        setPaused(true);
      }
      // If there is a lineAction provided, here is where to call it...
      onTypingEnd && onTypingEnd();
    } else {
      // Since we are not at the beginning, simply add a character
      setCurrentText(currentLine().substring(0, currentText().length + 1)); // Update the displayed text
    }
  }

  /**
   * Control actions of the typewriter typing backwards. It removes a single character if characters exist,
   * otherwise it changes direction to begin typing forward and switches to the appropriate line if using
   * multiple lines.
   */
  function handleBackSpace() {
    // Currently typing backward, so check if a line is back at the start.
    if (currentText().length === 0) {
      // Backspace ended, now at start of line
      if (!singleLine) {
        // Multiple lines, so we need to change lines.
        if (currentLineIndex() + 1 === text.length) {
          // Reset back to the first line
          setCurrentLineIndex(0);
          setCurrentLine(text[0]);
        } else {
          // Move to the next line...
          setCurrentLineIndex(currentLineIndex() + 1);
          setCurrentLine(text[currentLineIndex()]);
        }
      }
      // We are at the beginning so we need to change direction, and switch lines if using multiple lines
      setDirection("forward"); // Change direction
      // Since we have changed direction, we could run a pause here...
      setPaused(true);
      // Call the onBackspaceEnd() method if it exists.
      onBackspaceEnd && onBackspaceEnd();
    } else {
      // Since we are not at the beginning, simply remove a character.
      setCurrentText(currentLine().substring(0, currentText().length - 1)); // Update the displayed text
    }
  }

  return (
    <span class={className} style={style}>
      {currentText()}
      <Show when={cursor && !finished()}>
        <span class={cursorClassName}>|</span>
      </Show>
    </span>
  );
};

export default Typer;
