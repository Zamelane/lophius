import { useState } from "react";
import NextImage, { ImageProps } from "next/image";
import { CloudAlertIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = ImageProps;

export function Image({ ...props }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryKey, /*setRetryKey*/] = useState(0);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // const handleRetry = () => {
  //   setIsLoading(true);
  //   setHasError(false);
  //   setRetryKey(prev => prev + 1);
  // };

  return (
    <div
      className="relative inline-block"
      style={{ width: props.width, height: props.height }}
    >
      {(isLoading || hasError) && (
        <div
          className={`absolute inset-0 flex items-center justify-center rounded ${
            hasError
              ? "bg-destructive text-destructive-foreground flex-col gap-2"
              : "bg-muted animate-pulse"
          }`}
        >
          {hasError && (
            <>
              <CloudAlertIcon/>
            </>
          )}
        </div>
      )}

      <NextImage
        key={retryKey}
        {...props}
        onLoadingComplete={handleLoad}
        onError={handleError}
        className={cn(props.className, isLoading || hasError ? "invisible" : "block")}
      />
    </div>
  );
}
