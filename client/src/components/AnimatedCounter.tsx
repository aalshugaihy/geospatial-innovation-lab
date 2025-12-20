import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

export default function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2.5,
  decimals = 0,
}: AnimatedCounterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  return (
    <div ref={counterRef}>
      {isVisible && (
        <CountUp
          end={end}
          duration={duration}
          decimals={decimals}
          suffix={suffix}
          prefix={prefix}
        />
      )}
    </div>
  );
}
