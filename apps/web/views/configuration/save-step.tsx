import { Button } from '@/components/shadcn/ui/button'
import { LocaleLink } from '@/hooks/locale-link'
import { useApiRequest } from '@/hooks/use-api-request'
import type { ApiResponse } from '@/interfaces'
import { Capacity } from '@geist-ui/core'
import { useEffect, useState } from 'react'

import { CreateAdmin } from './actions/create-admin'
import { DatabasePush } from './actions/database-push'
import { RecreateDatabase } from './actions/recreate-database'
import { ReloadConfig } from './actions/reload-config'
import { SaveEnv } from './actions/save-env'

type Props = {
  onPrevious: () => void
  env: {
    [key: string]: string
  }
  adminCredentials: {
    nickname: string
    email: string
    password: string
  }
}

export function SaveStep({ onPrevious, env, adminCredentials }: Props) {
  const [progress, setProgress] = useState(0)
  const [description, setDescription] = useState('Ожидание запуска')
  const [error, setError] = useState('')
  const [isExecuted, setIsExecuted] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { execute: saveEnvExecute } = useApiRequest(SaveEnv)
  const { execute: recreateDatabaseExecute } = useApiRequest(RecreateDatabase)
  const { execute: dbFullExecute } = useApiRequest(DatabasePush)
  const { execute: createAdminExecute } = useApiRequest(CreateAdmin)
  const { execute: reloadConfigExecute } = useApiRequest(ReloadConfig)

  const steps: {
    execute: () => Promise<ApiResponse<string | undefined>>
    description: string
  }[] = [
    {
      execute: () => saveEnvExecute({ values: env }),
      description: 'Сохранение .env'
    },
    {
      execute: () =>
        recreateDatabaseExecute({
          database: env.DB_DATABASE,
          host: env.DB_HOST,
          password: env.DB_PASSWORD,
          user: env.DB_USER,
          port: Number(env.DB_PORT)
        }),
      description: 'Пересоздание базы данных'
    },
    {
      execute: () => dbFullExecute(),
      description: 'Создание таблиц'
    },
    {
      execute: () =>
        reloadConfigExecute({
          ...env
        }),
      description: 'Перезагрузка конфига ...'
    },
    {
      execute: () => createAdminExecute(adminCredentials),
      description: 'Создание профиля администратора'
    },
    {
      execute: () =>
        saveEnvExecute({
          values: {
            CONFIGURED: 'true'
          }
        }),
      description: 'Подтверждение изменений'
    },
    {
      execute: () =>
        reloadConfigExecute({
          ...env,
          CONFIGURED: 'true'
        }),
      description: 'Финальная перезагрузка конфига...'
    }
  ]

  // biome-ignore lint/correctness/useExhaustiveDependencies(steps): <explanation>
  // biome-ignore lint/correctness/useExhaustiveDependencies(isExecuted): <explanation>
  // biome-ignore lint/correctness/useExhaustiveDependencies(steps.length): <explanation>
  useEffect(() => {
    if (isExecuted) return // Если уже выполнялся, выходим
    setIsExecuted(true) // Помечаем как выполненный
    console.log(5555)
    setError('')

    async function process() {
      console.log('START =>')
      let i = 1
      for (const step of steps) {
        console.log(`STEP => ${i}`)
        setDescription(`Шаг ${i}. ${step.description}`)
        const result = await step.execute()
        if (!result.success) {
          throw new Error(result.error.message)
        }
        setProgress((100 / steps.length) * i)
        i++
        console.log(`${i} <= STEP`)
      }

      setProgress(100)
      console.log('<= END')
    }

    process()
      .then(() => {
        setIsSuccess(true)
      })
      .catch((err) => {
        setError(`${err}`)
        setIsExecuted(false)
      })
  }, [])

  return (
    <>
      {error ? (
        <div className='flex flex-col justify-center items-center gap-2 animate-fadeIn'>
          <div className='flex flex-col items-center'>
            <p className='text-lg text-red-500'>Произошла ошибка</p>
            <p className='text-sm'>{error}</p>
          </div>
          <Button onClick={onPrevious}>Назад</Button>
        </div>
      ) : isSuccess ? (
        <div className='flex flex-col gap-2 items-center justify-center animate-fadeIn'>
          <p>Поздравляем, всё настроено!</p>
          <LocaleLink href='/' prefetch={false}>
            <Button>На главную</Button>
          </LocaleLink>
        </div>
      ) : (
        <div className='flex flex-col gap-2 items-center justify-center animate-fadeIn'>
          <p>{description}</p>
          <Capacity color='#0070f3' value={progress} />
        </div>
      )}
    </>
  )
}
