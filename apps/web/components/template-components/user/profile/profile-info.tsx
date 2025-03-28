import { UserInfo } from "@/interfaces"

import { SimpleTitle } from "../../titles/simple-title"
//import { ProfileActivityChart } from "./charts/activity-chart"

export const ProfileInfo = ({
  data
}: { data: UserInfo }) => {
  const stats = [
    { value: '1.33k', title: 'Просмотры'         },
    { value: '10',    title: 'Лайки'             },
    { value: '0',     title: 'Комментарии'       },
    { value: '123',   title: 'Подписок'          },
    { value: '12',    title: 'Создано коллекций' },
  ]
  return (
    <div className="flex flex-col flex-grow gap-3 py-2 max-w-full">
      <SimpleTitle title="О себе">
      <i>{data.bio && data.bio.length ? data.bio :  'Пользователь ничего нам не рассказал...'}</i>
      </SimpleTitle>

      <SimpleTitle title="Статистика">
        <div className="flex flex-grow flex-wrap gap-3">
          {
            stats.map(
              (v, i) => (
                <div key={i} className="flex flex-col gap-1 flex-grow border-[1px] border-border px-3.5 py-3 rounded-sm">
                  <p className="text-sm font-semibold opacity-80 text-nowrap">{v.title}</p>
                  <p className="text-md">{v.value}</p>
                </div>
            ))
          }
        </div>
      </SimpleTitle>

      {/* <SimpleTitle title="Активность">
        <ProfileActivityChart/>
      </SimpleTitle> */}
    </div>
  )
}