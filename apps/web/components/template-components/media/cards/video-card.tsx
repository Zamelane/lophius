import Link from "next/link";
import Image from "next/image";

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
}

export function VideoCard(props: Props) {
  const { img, link, title, subText } = props
  return (
    <Link href={link} className="flex flex-col gap-[8px] text-start no-underline select-none w-full min-w-full relative">
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