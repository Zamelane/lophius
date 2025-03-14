'use client'

import { useState } from 'react';
import { ApiResponse } from '@/interfaces';

export function useApiRequest<T>(requestFn: () => Promise<ApiResponse<T>>) {
  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState<ApiResponse<T> | null>(null);

  const execute = async () => {
    setIsPending(true);
    try {
      const result = await requestFn();
      setResponse(result);
    } catch (error) {
      setResponse({
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    } finally {
      setIsPending(false);
    }
  };

  return {
    execute,
    response,
    isPending,
  };
}