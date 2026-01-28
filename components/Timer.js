import { useEffect, useState } from "react";

export default function Timer({
  duration,
  onEnd,
  autoStart = true
}) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!autoStart) return;

    if (timeLeft <= 0) {
      onEnd && onEnd();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, autoStart, onEnd]);

  return (
    <div style={styles.timer}>
      ⏱ {timeLeft}s
    </div>
  );
}

const styles = {
  timer: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
};

