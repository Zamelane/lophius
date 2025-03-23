'use client'

import { useState } from 'react';
import { api_t_keys } from '@/i18n';
import { ApiResponse } from '@/interfaces';

export function useApiRequest<T, P extends unknown[] = []>(
  requestFn: (...args: P) => Promise<ApiResponse<T>>
) {
  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState<ApiResponse<T> | null>(null);

  const execute = async (...args: P): Promise<ApiResponse<T>> => {
    setIsPending(true);
    try {
      const result = await requestFn(...args);
      setResponse(result);
      return result; // Возвращаем результат запроса
    } catch (error) {
      const errorResponse: ApiResponse<T> = {
        success: false,
        error: {
          i18n: api_t_keys.error,
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      };
      setResponse(errorResponse);
      return errorResponse; // Возвращаем ошибку
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