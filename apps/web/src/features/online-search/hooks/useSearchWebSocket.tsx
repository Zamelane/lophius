import { useRef, useState, useCallback } from "react";
import { getSearchKey } from "../services";
import { MediaType } from "database/schemas/media_types";

type Message =
  | { type: "close" }
  | { type: string; [key: string]: string };

type Status = "idle" | "connecting" | "connected" | "closed" | "error";

type Props = {
  query: string
  mediaType: MediaType
}

export function useSearchWebSocket({
  query,
  mediaType
}: Props) {
  const wsRef = useRef<WebSocket | null>(null);
  const abortRef = useRef<(() => void) | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const connect = useCallback((): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      const key = await getSearchKey(query, mediaType)
      if (!key) {
        reject(new Error("Нет ключа поиска"));
        return;
      }

      setStatus("connecting");
      setError(null);
      setResults([]);

      const ws = new WebSocket(`ws://localhost:3002/status?key=${key}`);
      wsRef.current = ws;

      ws.onopen = () => {
        setStatus("connected");
        console.log("✅ WebSocket подключен");
      };

      ws.onerror = () => {
        setStatus("error");
        ws.close();
        reject(new Error("Ошибка подключения"));
      };

      ws.onmessage = (event) => {
        try {
          const message: Message = JSON.parse(event.data);

          if (message.type === "result") {
            setResults((prev) => [...prev, message.payload]);
          }

          if (message.type === "close") {
            console.log("✅ Получено сообщение CLOSE, закрываю");
            ws.close();
            resolve();
          }
        } catch (err) {
          console.error("Ошибка парсинга сообщения", err);
        }
      };

      ws.onclose = () => {
        setStatus("closed");
        console.log("🔌 WebSocket закрыт");
      };

      abortRef.current = () => {
        ws.close();
        reject(new Error("Прервано вручную"));
      };
    });
  }, [query]);

  const disconnect = useCallback(() => {
    abortRef.current?.();
  }, []);

  return {
    connect,
    disconnect,
    status,
    error,
    results,
  };
}