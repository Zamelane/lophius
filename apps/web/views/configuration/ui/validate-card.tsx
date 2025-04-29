import { Card, CardContent } from '@/components/shadcn/ui/card'
import { Separator } from '@/components/ui/separator'
import type { LucideIcon } from 'lucide-react'

type Props = {
  icon?: LucideIcon
  title: string
  fields: {
    title: string
    value: string
  }[]
}

export function ValidateCard({ title, fields, ...props }: Props) {
  return (
    <Card>
      <CardContent className='p-6 flex flex-col gap-2'>
        <div className='flex items-center space-x-2 text-lg font-medium gap-2 flex-nowrap'>
          {props.icon && <props.icon size={24} />}
          <h3>{title}</h3>
        </div>
        <Separator className='my-3' />
        {fields.map((field, i) => (
          <dl key={i} className='grid dap-3 sm:grid-cols-2'>
            <div>
              <dt className='text-sm font-medium text-muted-foreground'>
                {field.title}
              </dt>
              <dd className='text-sm'>{field.value}</dd>
            </div>
          </dl>
        ))}
      </CardContent>
    </Card>
  )
}
