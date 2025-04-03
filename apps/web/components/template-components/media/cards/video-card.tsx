import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";

type Props = {
  link: string,
  img: {
    src: string
    width: number
    height: number
    alt: string
  },
  title: string
  subText: string
  staticSize?: boolean
}

export function VideoCard(props: Props) {
  const { img, link, title, subText, staticSize = true } = props
  return (
      // flex flex-col gap-[8px] no-underline select-none w-[160px] min-w-[160px]
    <Link href={link}
          className={cn(
            "flex flex-col gap-[8px] text-start no-underline select-none",
            staticSize ? "w-[160px] min-w-[160px]" : "w-full min-w-full relative"
          )}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        className="aspect-[5/7] pointer-events-none object-cover w-full rounded-[4px] max-h-[320px]"
      />
      <div className="flex flex-col">
        <p className="text-xs opacity-85">{subText}</p>
        <p className="text-sm line-clamp-2">{title}</p>
      </div>
    </Link>
  )
}