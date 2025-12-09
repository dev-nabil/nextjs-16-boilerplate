"use client"

import { motion, AnimatePresence, MotionConfig, useInView, Variants } from "framer-motion"
import type { ReactNode } from "react"
import { useRef, forwardRef } from "react"

interface MotionProviderProps {
  children: ReactNode
}

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </MotionConfig>
  )
}

// Enhanced motion wrapper components with scroll animations
export const MotionDiv = motion.div
export const MotionSection = motion.section
export const MotionArticle = motion.article
export const MotionHeader = motion.header
export const MotionFooter = motion.footer
export const MotionNav = motion.nav
export const MotionMain = motion.main
export const MotionAside = motion.aside
export const MotionSpan = motion.span
export const MotionP = motion.p
export const MotionH1 = motion.h1
export const MotionH2 = motion.h2
export const MotionH3 = motion.h3
export const MotionH4 = motion.h4
export const MotionH5 = motion.h5
export const MotionH6 = motion.h6
export const MotionUl = motion.ul
export const MotionLi = motion.li
export const MotionButton = motion.button

// Scroll-triggered animation component
interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  variant?: keyof typeof scrollVariants
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
  as?: keyof typeof motionComponents
}

const motionComponents = {
  div: MotionDiv,
  section: MotionSection,
  article: MotionArticle,
  header: MotionHeader,
  footer: MotionFooter,
  nav: MotionNav,
  main: MotionMain,
  aside: MotionAside,
  span: MotionSpan,
  p: MotionP,
  h1: MotionH1,
  h2: MotionH2,
  h3: MotionH3,
  h4: MotionH4,
  h5: MotionH5,
  h6: MotionH6,
  ul: MotionUl,
  li: MotionLi,
}

export const ScrollAnimation = forwardRef<HTMLElement, ScrollAnimationProps>(
  (
    { children, className, variant = "fadeInUp", delay = 0, duration = 0.6, once = true, as = "div" },
    ref,
  ) => {
    const localRef = useRef<HTMLElement>(null)
    const elementRef = (ref as React.RefObject<HTMLElement | null>) ?? localRef
    const isInView = useInView(elementRef, {
      once,
      margin: "-50px 0px -50px 0px",
    })

    const Component = motionComponents[as]
    const selectedVariant = scrollVariants[variant]

    return (
      <Component
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        ref={elementRef}
        className={className}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={selectedVariant as Variants}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </Component>
    )
  },
)

ScrollAnimation.displayName = "ScrollAnimation"

// Enhanced animation variants for scroll triggers
export const scrollVariants = {
  fadeInUp: {
    hidden: {
      opacity: 0,
      y: 60,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  },
  fadeInDown: {
    hidden: {
      opacity: 0,
      y: -60,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  },
  fadeInLeft: {
    hidden: {
      opacity: 0,
      x: -60,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
    },
  },
  fadeInRight: {
    hidden: {
      opacity: 0,
      x: 60,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
    },
  },
  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
  },
  scaleInRotate: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -10,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
    },
  },
  slideInUp: {
    hidden: {
      opacity: 0,
      y: 100,
      skewY: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
    },
  },
  slideInDown: {
    hidden: {
      opacity: 0,
      y: -100,
      skewY: -5,
    },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
    },
  },
  flipIn: {
    hidden: {
      opacity: 0,
      rotateX: -90,
      transformPerspective: 1000,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      transformPerspective: 1000,
    },
  },
  bounceIn: {
    hidden: {
      opacity: 0,
      scale: 0.3,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  },
  elasticIn: {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 8,
      },
    },
  },
  typewriter: {
    hidden: {
      width: 0,
      opacity: 0,
    },
    visible: {
      width: "auto",
      opacity: 1,
      transition: {
        width: {
          duration: 1,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.1,
        },
      },
    },
  },
}

// Legacy animation variants (keeping for backward compatibility)
export const fadeInUp = scrollVariants.fadeInUp
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const slideInLeft = scrollVariants.fadeInLeft
export const slideInRight = scrollVariants.fadeInRight
export const scaleIn = scrollVariants.scaleIn

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// Scroll-triggered stagger container
export const ScrollStagger = ({
  children,
  className,
  staggerDelay = 0.1,
  childDelay = 0.1,
}: {
  children: ReactNode
  className?: string
  staggerDelay?: number
  childDelay?: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px 0px -50px 0px",
  })

  return (
    <MotionDiv
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: childDelay,
          },
        },
      }}
    >
      {children}
    </MotionDiv>
  )
}

// Parallax scroll component
export const ParallaxScroll = ({
  children,
  className,
  speed = 0.5,
  direction = "up",
}: {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
}) => {
  const ref = useRef(null)

  const getTransform = () => {
    const transforms = {
      up: `translateY(${speed * -100}%)`,
      down: `translateY(${speed * 100}%)`,
      left: `translateX(${speed * -100}%)`,
      right: `translateX(${speed * 100}%)`,
    }
    return transforms[direction]
  }

  return (
    <MotionDiv
      ref={ref}
      className={className}
      whileInView={{
        transform: getTransform(),
      }}
      transition={{
        duration: 0,
        ease: "linear",
      }}
      viewport={{ once: false }}
    >
      {children}
    </MotionDiv>
  )
}

// Magnetic hover effect
export const MagneticHover = ({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) => {
  return (
    <MotionDiv
      className={className}
      whileHover={{
        scale: 1 + strength * 0.1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
      }}
      whileTap={{
        scale: 1 - strength * 0.1,
      }}
    >
      {children}
    </MotionDiv>
  )
}
