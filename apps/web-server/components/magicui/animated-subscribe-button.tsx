"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { HTMLMotionProps } from "motion/react";
import { motion, AnimatePresence } from "motion/react";

interface AnimatedSubscribeButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref"> {
  className?: string;
  subscribeStatus?: boolean;
  children: React.ReactNode;
}

export const AnimatedSubscribeButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedSubscribeButtonProps
>(
  (
    { onClick, children, className, subscribeStatus = false, ...props },
    ref,
  ) => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribeStatus);

    if (
      React.Children.count(children) !== 2 ||
      !React.Children.toArray(children).every(
        (child) => React.isValidElement(child) && child.type === "span",
      )
    ) {
      throw new Error(
        "AnimatedSubscribeButton expects two children, both of which must be <span> elements.",
      );
    }

    const childrenArray = React.Children.toArray(children);
    const initialChild = childrenArray[0];
    const changeChild = childrenArray[1];

    return (
      <AnimatePresence mode="wait">
        {isSubscribed ? (
          <motion.button
            ref={ref}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setIsSubscribed(false);
              onClick?.(e);
            }}
            className={cn(
              "relative flex h-10 w-fit items-center justify-center overflow-hidden rounded-lg bg-primary px-6 text-primary-foreground",
              className,
            )}
            {...props}
          >
            <motion.span
              key="action"
              animate={{ y: 0 }}
              initial={{ y: -50 }}
              className="relative flex h-full w-full items-center justify-center font-semibold"
            >
              {changeChild} {/* Use children for subscribed state */}
            </motion.span>
          </motion.button>
        ) : (
          <motion.button
            ref={ref}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={(e) => {
              setIsSubscribed(true);
              onClick?.(e);
            }}
            className={cn(
              "relative flex h-10 w-fit cursor-pointer items-center justify-center rounded-lg border-none bg-primary px-6 text-primary-foreground",
              className,
            )}
            {...props}
          >
            <motion.span
              key="reaction"
              initial={{ x: 0 }}
              exit={{ x: 50, transition: { duration: 0.1 } }}
              className="relative flex items-center justify-center font-semibold"
            >
              {initialChild} {/* Use children for unsubscribed state */}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    );
  },
);

AnimatedSubscribeButton.displayName = "AnimatedSubscribeButton";
