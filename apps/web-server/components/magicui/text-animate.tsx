"use client";

import { cn } from "@/lib/utils";
import { ElementType } from "react";
import { motion, Variants, MotionProps, AnimatePresence } from "motion/react";

type AnimationType = "character" | "line" | "text" | "word";
type AnimationVariant =
  | "blurIn"
  | "blurInDown"
  | "blurInUp"
  | "fadeIn"
  | "scaleDown"
  | "scaleUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "slideUp";

interface TextAnimateProps extends MotionProps {
  /**
   * The delay before the animation starts
   */
  delay?: number;
  /**
   * Whether to animate only once
   */
  once?: boolean;
  /**
   * The text content to animate
   */
  children: string;
  /**
   * The element type to render
   */
  as?: ElementType;
  /**
   * The duration of the animation
   */
  duration?: number;
  /**
   * The class name to be applied to the component
   */
  className?: string;
  /**
   * How to split the text ("text", "word", "character")
   */
  by?: AnimationType;
  /**
   * Custom motion variants for the animation
   */
  variants?: Variants;
  /**
   * Whether to start animation when component enters viewport
   */
  startOnView?: boolean;
  /**
   * The class name to be applied to each segment
   */
  segmentClassName?: string;
  /**
   * The animation preset to use
   */
  animation?: AnimationVariant;
}

const staggerTimings: Record<AnimationType, number> = {
  character: 0.03,
  line: 0.06,
  text: 0.06,
  word: 0.05,
};

const defaultContainerVariants = {
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.05,
    },
  },
};

const defaultItemVariants: Variants = {
  exit: {
    opacity: 0,
  },
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

const defaultItemAnimationVariants: Record<
  AnimationVariant,
  { container: Variants; item: Variants }
> = {
  blurIn: {
    container: defaultContainerVariants,
    item: {
      exit: {
        filter: "blur(10px)",
        opacity: 0,
        transition: { duration: 0.3 },
      },
      hidden: { filter: "blur(10px)", opacity: 0 },
      show: {
        filter: "blur(0px)",
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      },
    },
  },
  blurInDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { filter: "blur(10px)", opacity: 0, y: -20 },
      show: {
        filter: "blur(0px)",
        opacity: 1,
        transition: {
          filter: { duration: 0.3 },
          opacity: { duration: 0.4 },
          y: { duration: 0.3 },
        },
        y: 0,
      },
    },
  },
  blurInUp: {
    container: defaultContainerVariants,
    item: {
      exit: {
        filter: "blur(10px)",
        opacity: 0,
        transition: {
          filter: { duration: 0.3 },
          opacity: { duration: 0.4 },
          y: { duration: 0.3 },
        },
        y: 20,
      },
      hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
      show: {
        filter: "blur(0px)",
        opacity: 1,
        transition: {
          filter: { duration: 0.3 },
          opacity: { duration: 0.4 },
          y: { duration: 0.3 },
        },
        y: 0,
      },
    },
  },
  fadeIn: {
    container: defaultContainerVariants,
    item: {
      exit: {
        opacity: 0,
        transition: { duration: 0.3 },
        y: 20,
      },
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        transition: {
          duration: 0.3,
        },
        y: 0,
      },
    },
  },
  scaleDown: {
    container: defaultContainerVariants,
    item: {
      exit: {
        opacity: 0,
        scale: 1.5,
        transition: { duration: 0.3 },
      },
      hidden: { opacity: 0, scale: 1.5 },
      show: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.3,
          scale: {
            damping: 15,
            stiffness: 300,
            type: "spring",
          },
        },
      },
    },
  },
  scaleUp: {
    container: defaultContainerVariants,
    item: {
      exit: {
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.3 },
      },
      hidden: { opacity: 0, scale: 0.5 },
      show: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.3,
          scale: {
            damping: 15,
            stiffness: 300,
            type: "spring",
          },
        },
      },
    },
  },
  slideDown: {
    container: defaultContainerVariants,
    item: {
      exit: {
        opacity: 0,
        transition: { duration: 0.3 },
        y: 20,
      },
      hidden: { opacity: 0, y: -20 },
      show: {
        opacity: 1,
        transition: { duration: 0.3 },
        y: 0,
      },
    },
  },
  slideLeft: {
    container: defaultContainerVariants,
    item: {
      exit: {
        opacity: 0,
        transition: { duration: 0.3 },
        x: -20,
      },
      hidden: { opacity: 0, x: 20 },
      show: {
        opacity: 1,
        transition: { duration: 0.3 },
        x: 0,
      },
    },
  },
  slideRight: {
    container: defaultContainerVariants,
    item: {
      exit: {
        opacity: 0,
        transition: { duration: 0.3 },
        x: 20,
      },
      hidden: { opacity: 0, x: -20 },
      show: {
        opacity: 1,
        transition: { duration: 0.3 },
        x: 0,
      },
    },
  },
  slideUp: {
    container: defaultContainerVariants,
    item: {
      exit: {
        opacity: 0,
        transition: {
          duration: 0.3,
        },
        y: -20,
      },
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        transition: {
          duration: 0.3,
        },
        y: 0,
      },
    },
  },
};

export function TextAnimate({
  animation = "fadeIn",
  as: Component = "p",
  by = "word",
  children,
  className,
  delay = 0,
  duration = 0.3,
  once = false,
  segmentClassName,
  startOnView = true,
  variants,
  ...props
}: TextAnimateProps) {
  const MotionComponent = motion.create(Component);

  let segments: string[] = [];
  switch (by) {
    case "character":
      segments = children.split("");
      break;
    case "line":
      segments = children.split("\n");
      break;
    case "word":
      segments = children.split(/(\s+)/);
      break;
    case "text":
    default:
      segments = [children];
      break;
  }

  const finalVariants = variants
    ? {
        container: {
          exit: {
            opacity: 0,
            transition: {
              staggerChildren: duration / segments.length,
              staggerDirection: -1,
            },
          },
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              delayChildren: delay,
              opacity: { delay, duration: 0.01 },
              staggerChildren: duration / segments.length,
            },
          },
        },
        item: variants,
      }
    : animation
      ? {
          container: {
            ...defaultItemAnimationVariants[animation].container,
            exit: {
              ...defaultItemAnimationVariants[animation].container.exit,
              transition: {
                staggerChildren: duration / segments.length,
                staggerDirection: -1,
              },
            },
            show: {
              ...defaultItemAnimationVariants[animation].container.show,
              transition: {
                delayChildren: delay,
                staggerChildren: duration / segments.length,
              },
            },
          },
          item: defaultItemAnimationVariants[animation].item,
        }
      : { container: defaultContainerVariants, item: defaultItemVariants };

  return (
    <AnimatePresence mode="popLayout">
      <MotionComponent
        exit="exit"
        initial="hidden"
        viewport={{ once }}
        animate={startOnView ? undefined : "show"}
        variants={finalVariants.container as Variants}
        whileInView={startOnView ? "show" : undefined}
        className={cn("whitespace-pre-wrap", className)}
        {...props}
      >
        {segments.map((segment, i) => (
          <motion.span
            key={`${by}-${segment}-${i}`}
            variants={finalVariants.item}
            custom={i * staggerTimings[by]}
            className={cn(
              by === "line" ? "block" : "inline-block whitespace-pre",
              by === "character" && "",
              segmentClassName,
            )}
          >
            {segment}
          </motion.span>
        ))}
      </MotionComponent>
    </AnimatePresence>
  );
}
