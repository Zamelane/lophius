import { Button } from '@/src/shared/ui/shadcn/button'
import { ValidateCard } from '@/src/widgets/configuration/validate-card'
import { DatabaseIcon, ServerIcon, UserIcon } from 'lucide-react'

type ExternalFormData = Partial<{
  //
  dbHost: string
  dbDatabase: string
  dbPassword: string
  dbPort: string
  dbUser: string

  //
  nickname: string
  email: string
  password: string

  //
  publicUrl: string
  maxUploadFileSize: string
}>

type Props = {
  configData: ExternalFormData
  onPrevious: () => void
  onNext: () => void
}

export function ReviewStep({ onPrevious, onNext, configData }: Props) {
  return (
    <div className='flex flex-col gap-3 animate-fadeIn'>
      <ValidateCard
        icon={UserIcon}
        title='Аккаунт администратора'
        fields={[
          {
            title: 'Никнейм',
            value: configData.nickname ?? ''
          },
          {
            title: 'Email',
            value: configData.email ?? ''
          },
          {
            title: 'Пароль',
            value: configData.password ?? ''
          }
        ]}
      />

      <ValidateCard
        icon={DatabaseIcon}
        title='Конфигурация базы данных'
        fields={[
          {
            title: 'Хост',
            value: configData.dbHost ?? ''
          },
          {
            title: 'Порт',
            value: configData.dbPort ?? ''
          },
          {
            title: 'Пользователь',
            value: configData.dbUser ?? ''
          },
          {
            title: 'Пароль',
            value: configData.dbPassword ?? ''
          },
          {
            title: 'Имя базы данных',
            value: configData.dbDatabase ?? ''
          }
        ]}
      />

      <ValidateCard
        icon={ServerIcon}
        title='Настройки сервера'
        fields={[
          {
            title: 'Публичный адрес',
            value: configData.publicUrl ?? ''
          },
          {
            title: 'Максимальный размер загружаемого файла',
            value: `${configData.maxUploadFileSize ?? ''} байт`
          }
        ]}
      />

      <div className='flex flex-row'>
        <Button
          variant='outline'
          onClick={onPrevious}
          className='max-w-min mr-auto'
        >
          Назад
        </Button>
        <Button onClick={() => onNext()} className='max-w-min ml-auto'>
          Сохранить
        </Button>
      </div>
    </div>
  )
}
