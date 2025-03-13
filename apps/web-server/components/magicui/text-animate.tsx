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
  line: 0.06,
  text: 0.06,
  word: 0.05,
  character: 0.03,
};

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerDirection: -1,
      staggerChildren: 0.05,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  exit: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const defaultItemAnimationVariants: Record<
  AnimationVariant,
  { container: Variants; item: Variants }
> = {
  slideDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: -20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        y: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideLeft: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        x: -20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideRight: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: -20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        x: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  fadeIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 20, opacity: 0 },
      exit: {
        y: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      },
    },
  },
  slideUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      },
      exit: {
        y: -20,
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      },
    },
  },
  blurInDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: -20, opacity: 0, filter: "blur(10px)" },
      show: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          y: { duration: 0.3 },
          filter: { duration: 0.3 },
          opacity: { duration: 0.4 },
        },
      },
    },
  },
  blurIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      exit: {
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.3 },
      },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.3,
        },
      },
    },
  },
  scaleUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0.5 },
      exit: {
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.3 },
      },
      show: {
        scale: 1,
        opacity: 1,
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
  scaleDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 1.5 },
      exit: {
        opacity: 0,
        scale: 1.5,
        transition: { duration: 0.3 },
      },
      show: {
        scale: 1,
        opacity: 1,
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
  blurInUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
      show: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          y: { duration: 0.3 },
          filter: { duration: 0.3 },
          opacity: { duration: 0.4 },
        },
      },
      exit: {
        y: 20,
        opacity: 0,
        filter: "blur(10px)",
        transition: {
          y: { duration: 0.3 },
          filter: { duration: 0.3 },
          opacity: { duration: 0.4 },
        },
      },
    },
  },
};

export function TextAnimate({
  children,
  variants,
  className,
  delay = 0,
  by = "word",
  once = false,
  duration = 0.3,
  segmentClassName,
  startOnView = true,
  as: Component = "p",
  animation = "fadeIn",
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
        item: variants,
        container: {
          hidden: { opacity: 0 },
          exit: {
            opacity: 0,
            transition: {
              staggerDirection: -1,
              staggerChildren: duration / segments.length,
            },
          },
          show: {
            opacity: 1,
            transition: {
              delayChildren: delay,
              opacity: { delay, duration: 0.01 },
              staggerChildren: duration / segments.length,
            },
          },
        },
      }
    : animation
      ? {
          item: defaultItemAnimationVariants[animation].item,
          container: {
            ...defaultItemAnimationVariants[animation].container,
            exit: {
              ...defaultItemAnimationVariants[animation].container.exit,
              transition: {
                staggerDirection: -1,
                staggerChildren: duration / segments.length,
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
        }
      : { item: defaultItemVariants, container: defaultContainerVariants };

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
