import React, { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  highlightWord?: string; // Word to highlight
  highlightColor?: string; // Color for the highlighted word
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 100,
  delay = 0,
  className = "",
  onComplete,
  highlightWord,
  highlightColor, // Keep for potential future use
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isTypingHighlight, setIsTypingHighlight] = useState(false);

  useEffect(() => {
    // Start after delay
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        const nextText = displayedText + text[currentIndex];
        setDisplayedText(nextText);
        setCurrentIndex((prev) => prev + 1);

        // Check if we're typing the highlighted word
        if (highlightWord) {
          const highlightStartIndex = text.indexOf(highlightWord);

          // Check if we're currently typing within the highlighted word
          // Use currentIndex + 1 because we're about to move to the next position
          const nextIndex = currentIndex + 1;
          const isInHighlight =
            nextIndex > highlightStartIndex &&
            highlightStartIndex !== -1 &&
            nextIndex <= highlightStartIndex + highlightWord.length;
          setIsTypingHighlight(isInHighlight);
        }
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && onComplete) {
      // Call onComplete when typing is finished
      setIsTypingHighlight(false); // Reset highlight state when done
      onComplete();
    }
  }, [
    currentIndex,
    text,
    speed,
    isStarted,
    onComplete,
    displayedText,
    highlightWord,
  ]);

  // Function to render text with highlighting
  const renderStyledText = () => {
    if (highlightWord && text) {
      const highlightStartIndex = text.indexOf(highlightWord);

      if (highlightStartIndex !== -1) {
        const highlightEndIndex = highlightStartIndex + highlightWord.length;

        // Debug logging
        console.log("Debug cursor color:", {
          currentIndex,
          highlightStartIndex,
          highlightEndIndex,
          isTypingHighlight,
        });

        const beforeText = text.slice(
          0,
          Math.min(currentIndex, highlightStartIndex)
        );
        const highlightPart = text.slice(
          Math.max(highlightStartIndex, 0),
          Math.min(currentIndex, highlightEndIndex)
        );

        if (currentIndex <= highlightStartIndex) {
          // We haven't reached the highlight yet
          return <>{beforeText}</>;
        } else if (currentIndex <= highlightEndIndex) {
          // We're typing within the highlight
          return (
            <>
              {beforeText}
              <span className="typewriter-highlight">{highlightPart}</span>
            </>
          );
        } else {
          // We've passed the highlight
          const afterText = text.slice(highlightEndIndex, currentIndex);
          const fullHighlight = text.slice(
            highlightStartIndex,
            highlightEndIndex
          );

          return (
            <>
              {beforeText}
              <span className="typewriter-highlight">{fullHighlight}</span>
              {afterText}
            </>
          );
        }
      }
    }

    return <>{text.slice(0, currentIndex)}</>;
  };

  return (
    <span className={className}>
      {renderStyledText()}
      <span
        className={`typewriter-cursor ${isTypingHighlight ? "highlight" : ""}`}
      >
        |
      </span>
    </span>
  );
};

export default Typewriter;
