import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { easeOutExpo } from '../../lib/motion';

const CountUp = ({
  value = 0,
  decimals = 0,
  duration = 1.6,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '0px 0px -40px 0px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const target = Number(value);
  const isValid = Number.isFinite(target);

  useEffect(() => {
    if (!inView) {
      setDisplay(0);
      return undefined;
    }
    if (!isValid) return undefined;
    if (reduce) {
      setDisplay(target);
      return undefined;
    }
    const controls = animate(0, target, {
      duration,
      ease: easeOutExpo,
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, isValid, reduce, target, duration]);

  if (!isValid) {
    return (
      <span ref={ref} className={className}>
        {prefix}
        {value}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default CountUp;
