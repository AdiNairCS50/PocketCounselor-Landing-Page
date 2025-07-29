import React, { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 100,
  delay = 0,
  className = "",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

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
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed, isStarted]);

  return (
    <span className={className}>
      {displayedText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

export default Typewriter;
