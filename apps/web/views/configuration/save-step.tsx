import { Capacity } from "@geist-ui/core"
import { useState, useEffect } from "react"
import { LocaleLink } from "@/hooks/locale-link"
import { Button } from "@/components/shadcn/ui/button"
import { useApiRequest } from "@/hooks/use-api-request"

import { SaveEnv } from "./actions/save-env"
import { DatabasePush } from "./actions/database-push"
import { ReloadConfig } from "./actions/reload-config"
import { RecreateSchema } from "./actions/recreate-schema"

type Props = {
  onPrevious: () => void,
  env: {
    [key: string]: string
  }
}

export function SaveStep({ onPrevious, env }: Props) {
  const [progress, setProgress] = useState(0);
  const [description, setDescription] = useState("Ожидание запуска");
  const [error, setError] = useState("");
  const [isExecuted, setIsExecuted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)

	const { execute: saveEnvExecute } = useApiRequest(SaveEnv)
	const { execute: removeSchemaExecute } = useApiRequest(RecreateSchema)
	const { execute: dbFullExecute } = useApiRequest(DatabasePush)
	const { execute: reloadConfigExecute } = useApiRequest(ReloadConfig)

  useEffect(() => {
    if (isExecuted) return; // Если уже выполнялся, выходим
    setIsExecuted(true); // Помечаем как выполненный

    setError("")

    async function process() {
      setDescription("Шаг 1. Сохранение .env")
      const step_1 = await saveEnvExecute({
        values: env
      })
      if (!step_1.success) {
        throw new Error(step_1.error.message)
      }

      setDescription("Шаг 2. Пересоздание схемы.")
      setProgress(15)
      const step_2 = await removeSchemaExecute({
        database: 'lophius',
        host: '127.0.0.1',
        password: 'postgres',
        user: 'postgres',
        port: 5432
      })
      if (!step_2.success) {
        throw new Error(step_2.error.message)
      }

      setDescription("Шаг 3. Создание таблиц")
      setProgress(35)
      const step_3 = await dbFullExecute()
      if (!step_3.success) {
        throw new Error(step_3.error.message)
      }

      setDescription("Шаг 4. Подтверждение изменений")
      setProgress(65)
      const step_4 = await saveEnvExecute({
        values: {
          'CONFIGURED': 'true'
        }
      })
      if (!step_4.success) {
        throw new Error(step_4.error.message)
      }

      setDescription("Шаг 5. Перезагрузка конфига")
      setProgress(85)
      const step_5 = await reloadConfigExecute({
        ...env,
        'CONFIGURED': 'true'
      })
      if (!step_5.success) {
        throw new Error(step_5.error.message)
      }

      setProgress(100)
    }
    process().then(() => {
      setIsSuccess(true)
    }).catch((err) => {
      setError(JSON.stringify(err))
    }).finally(() => {
      setIsExecuted(false)
    })
    return
  }, [])

  return (
    <>
      {
        error
          ? (
            <div className="flex flex-col justify-center items-center gap-2 animate-fadeIn">
              <div className="flex flex-col items-center">
                <p className="text-lg text-red-500">Произошла ошибка</p>
                <p className="text-sm">{error}</p>
              </div>
              <Button onClick={onPrevious}>Назад</Button>
            </div>
          )
          : (
            isSuccess
              ? (
                <div className="flex flex-col gap-2 items-center justify-center animate-fadeIn">
                  <p>Поздравляем, всё настроено!</p>
                  <LocaleLink href="/">
                    <Button>На главную</Button>
                  </LocaleLink>
                </div>
              )
              : (
                <div className="flex flex-col gap-2 items-center justify-center animate-fadeIn">
                  <p>{description}</p>
                  <Capacity color="#0070f3" value={progress}/>
                </div>
              )
          )
      }
    </>
  )
}