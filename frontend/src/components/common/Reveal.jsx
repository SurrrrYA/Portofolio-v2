import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  fadeUp,
  fadeDown,
  slideFromLeft,
  slideFromRight,
  scaleIn,
  fadeIn,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '../../lib/motion';

const VARIANT_MAP = {
  up: fadeUp,
  down: fadeDown,
  left: slideFromLeft,
  right: slideFromRight,
  scale: scaleIn,
  fade: fadeIn,
};

const addDelay = (variants, delay) => {
  if (!delay) return variants;
  return {
    hidden: variants.hidden,
    show: {
      ...variants.show,
      transition: { ...(variants.show?.transition || {}), delay },
    },
  };
};

export const Reveal = ({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  as = 'div',
  amount,
  once = true,
  ...rest
}) => {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduce) {
    const PlainTag = as;
    return (
      <PlainTag className={className} {...rest}>
        {children}
      </PlainTag>
    );
  }

  const variants = addDelay(VARIANT_MAP[variant] || fadeUp, delay);

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ ...viewportOnce, once, ...(amount ? { amount } : {}) }}
      variants={variants}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const Stagger = ({
  children,
  className = '',
  stagger = 0.09,
  delayChildren = 0.08,
  amount = 0.1,
  as = 'div',
  ...rest
}) => {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduce) {
    const PlainTag = as;
    return (
      <PlainTag className={className} {...rest}>
        {children}
      </PlainTag>
    );
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ ...viewportOnce, amount }}
      variants={staggerContainer(stagger, delayChildren)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const StaggerItem = ({ children, className = '', as = 'div', ...rest }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduce) {
    const PlainTag = as;
    return (
      <PlainTag className={className} {...rest}>
        {children}
      </PlainTag>
    );
  }

  return (
    <Tag className={className} variants={staggerItem} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
