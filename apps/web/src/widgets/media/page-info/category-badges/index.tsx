import { LocaleLink } from "@/src/shared/hooks/locale-link"
import { ImageType } from "@/src/shared/types"
import Image from "next/image"

export type CategoryBadges = {
  title: string
  badges: BadgeType[]
}

export function CategoryBadges({ title, badges }: CategoryBadges) {
  if (badges.length === 0) {
    return
  }
  
  return (
    <div className='flex flex-col gap-2'>
      <h6 className='text-lg font-semibold'>{title}</h6>
      <div className='flex flex-wrap gap-1'>
        {
          badges.map((badge, i) => <Badge key={i} {...badge} />)
        }
      </div>
    </div>
  )
}

export type BadgeType = {
  href?: string
  img?: ImageType
  title: string
}

const badgeStyles = {
  'link': 'rounded-full inline-flex gap-1 items-center border transition-colors focus:outline-none border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs font-medium pr-1.5',
  'image': 'rounded-full w-[20px] h-[20px] border-secondary border-[1px] bg-background'
}

export function Badge({ title, href, img }: BadgeType) {
  const content = (
    <>
      {
        img && <Image
          alt={title}
          width={20}
          height={20}
          className={badgeStyles['image']}
          src={`http${img.https ? 's' : ''}://${img.domain}${img.path}`}
        />
      }
      { ` ${title}` }
    </>
  )

  if (href) {
    <LocaleLink href='/tv-network/123' className={badgeStyles['link']}>{content}</LocaleLink>
  }

  return (
    <div className={badgeStyles['link']}>{content}</div>
  )
}