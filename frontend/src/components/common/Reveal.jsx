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
  staggerItemDown,
  viewportReplay,
} from '../../lib/motion';
import { useScrollDirection } from '../../contexts/ScrollDirectionContext';

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
  once = false,
  ...rest
}) => {
  const reduce = useReducedMotion();
  const direction = useScrollDirection();
  const Tag = motion[as] || motion.div;

  if (reduce) {
    const PlainTag = as;
    return (
      <PlainTag className={className} {...rest}>
        {children}
      </PlainTag>
    );
  }

  const resolvedVariant =
    variant === 'up' && direction === 'up' ? fadeDown : VARIANT_MAP[variant] || fadeUp;
  const variants = addDelay(resolvedVariant, delay);

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ ...viewportReplay, once, ...(amount ? { amount } : {}) }}
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
  once = false,
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
      viewport={{ ...viewportReplay, once, amount }}
      variants={staggerContainer(stagger, delayChildren)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const StaggerItem = ({ children, className = '', as = 'div', ...rest }) => {
  const reduce = useReducedMotion();
  const direction = useScrollDirection();
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
      variants={direction === 'up' ? staggerItemDown : staggerItem}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
