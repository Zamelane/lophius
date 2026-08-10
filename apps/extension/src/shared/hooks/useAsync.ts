import { useState } from 'react';

export function useAsync<T, Args extends any[]>(asyncFn: (...args: Args) => Promise<T>) {
  const [isPending, setIsPending] = useState(false);

  const execute = async (...args: Args): Promise<T | undefined> => {
    setIsPending(true);
    try {
      return await asyncFn(...args);
    } catch (error) {
      console.error("Async operation failed:", error);
    } finally {
      setIsPending(false);
    }
  };

  return { execute, isPending };
}
