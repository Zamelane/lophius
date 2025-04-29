'use client'

import { AccountCreationStep } from '@/views/configuration/account-creation-step'
import { DatabaseConfigStep } from '@/views/configuration/database-config-step'
import { ReviewStep } from '@/views/configuration/review-step'
import { ServerConfigurationStep } from '@/views/configuration/server-configuration-step'
import { type Step, Stepper } from '@/views/configuration/stepper'
import {
  ClipboardCheckIcon,
  DatabaseIcon,
  HardDriveDownloadIcon,
  ServerIcon,
  UserIcon
} from 'lucide-react'
import { useState } from 'react'

import { SaveStep } from './save-step'

export function ConfigurationView() {
  const [currentStep, setCurrentStep] = useState(0)
  const [configData, setConfigData] = useState({
    //
    dbHost: process.env.DB_HOST ?? '127.0.0.1',
    dbDatabase: process.env.DB_DATABASE ?? 'lophius',
    dbPassword: process.env.DB_PASSWORD ?? '',
    dbPort: process.env.DB_PORT ?? '5432',
    dbUser: process.env.DB_USER ?? '',

    //
    email: '',
    nickname: '',
    password: '',

    //
    publicUrl: process.env.PUBLIC_URL ?? 'http://localhost:3000',
    maxUploadFileSize: process.env.MAX_FILE_SIZE ?? '7340032'
  })

  const updateFormData = (data: Partial<typeof configData>) => {
    setConfigData((prev) => ({ ...prev, ...data }))
  }

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const steps: Step[] = [
    {
      component: (
        <AccountCreationStep
          onNext={goToNextStep}
          configData={configData}
          updateFormData={updateFormData}
        />
      ),
      description: 'Используется для конфигурации сервера',
      icon: UserIcon,
      title: 'Аккаунт администратора'
    },
    {
      component: (
        <DatabaseConfigStep
          onNext={goToNextStep}
          configData={configData}
          onPrevious={goToPreviousStep}
          updateFormData={updateFormData}
        />
      ),
      description: 'Данные для подключения к базе данных',
      icon: DatabaseIcon,
      title: 'Конфигурация базы данных'
    },
    {
      component: (
        <ServerConfigurationStep
          onNext={goToNextStep}
          configData={configData}
          onPrevious={goToPreviousStep}
          updateFormData={updateFormData}
        />
      ),
      description: 'Основные настройки для корректной работы',
      icon: ServerIcon,
      title: 'Конфигурация сервера'
    },
    {
      component: (
        <ReviewStep
          onNext={goToNextStep}
          configData={configData}
          onPrevious={goToPreviousStep}
        />
      ),
      icon: ClipboardCheckIcon,
      title: 'Подтверждение',
      description: 'Проверьте данные и сохранитесь'
    },
    {
      component: (
        <SaveStep
          onPrevious={goToPreviousStep}
          adminCredentials={{
            email: configData.email,
            nickname: configData.nickname,
            password: configData.password
          }}
          env={{
            DB_HOST: configData.dbHost,
            DB_DATABASE: configData.dbDatabase,
            DB_PASSWORD: configData.dbPassword,
            DB_PORT: configData.dbPort,
            DB_USER: configData.dbUser,
            MAX_FILE_SIZE: configData.maxUploadFileSize,
            PUBLIC_URL: configData.publicUrl
          }}
        />
      ),
      title: 'Сохранение',
      description: 'Создание базы данных и заполнение',
      icon: HardDriveDownloadIcon
    }
  ]

  return (
    <div className='flex flex-col gap-6 max-w-screen-lg'>
      <Stepper steps={steps} stepIndex={currentStep} />
    </div>
  )
}
