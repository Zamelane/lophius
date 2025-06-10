import { useRef, useState, useCallback, useEffect } from 'react';
import { applyPatch, Operation } from 'fast-json-patch';
import { ParseStatus } from '@/src/widgets/auto-parse/statusCard';

type PatchMessage = {
  type: 'patch';
  patch: Operation[];
};

type CompletedMessage = {
  status: 'completed';
};

type WebSocketMessage = PatchMessage | CompletedMessage;

type UseMediaInfoWebSocketOptions = {
  initialData: any;
  onClose?: () => void;
  onError?: (error: string) => void;
};

export function useMediaInfoWebSocket({
  initialData,
  onClose,
  onError,
}: UseMediaInfoWebSocketOptions) {
  const [mediaInfo, setMediaInfo] = useState(initialData);
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState<ParseStatus>('idle')

  const wsRef = useRef<WebSocket | null>(null);
  const patchQueueRef = useRef<Operation[]>([]);
  const isProcessingRef = useRef(false);
  const dataRef = useRef(initialData);

  const processQueue = useCallback(() => {
    if (isProcessingRef.current || patchQueueRef.current.length === 0) return;

    isProcessingRef.current = true;
    const patchesToApply = [...patchQueueRef.current];
    patchQueueRef.current = [];

    try {
      const result = applyPatch(dataRef.current, patchesToApply, false, false);
      const newData = result.newDocument;
      dataRef.current = newData;
      setMediaInfo(newData);
    } catch (err) {
      console.error('Patch application failed:', err);
      onError?.('Ошибка применения изменений');
    } finally {
      isProcessingRef.current = false;
      
      if (patchQueueRef.current.length > 0) {
        processQueue();
      }
    }
  }, [onError]);

  const handlePatch = useCallback((patch: Operation[]) => {
    patchQueueRef.current.push(...patch);
    processQueue();
  }, [processQueue]);

  const connect = useCallback((key: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/status?key=${key}`);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      setStatus('parsing')
    }
    ws.onerror = () => {
      onError?.('WebSocket error');
      setStatus('error')
      setConnected(false);
    };
    ws.onclose = () => {
      setConnected(false);
      setStatus('completed')
      onClose?.();
    };
    ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        
        // Правильная проверка типа сообщения
        if ('type' in message && message.type === 'patch') {
          handlePatch(message.patch);
        } else if ('status' in message && message.status === 'completed') {
          console.log('Processing completed');
          ws.close()
        }
      } catch (err) {
        console.error('Message processing error:', err);
      }
    };

    return () => ws.close();
  }, [handlePatch, onClose, onError]);

  const disconnect = useCallback(() => {
    setMediaInfo(initialData)
    setStatus('cancelled')
    wsRef.current?.close();
    wsRef.current = null;
  }, []);

  useEffect(() => {
    dataRef.current = mediaInfo;
  }, [mediaInfo]);

  return {
    mediaInfo,
    connected,
    status,
    connect,
    disconnect,
  };
}