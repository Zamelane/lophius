import Link from "next/link";

type Props = {
	href?: string
	accent?: boolean
	text: string
}

export function Tag(props: Props) {
	const accentClassName = "inline-flex flex-shrink-0 items-center border font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs px-2.5 py-0.5 rounded-full"
	const noAccentClassName = "inline-flex flex-shrink-0 items-center border font-semibold transition-colors text-foreground text-xs px-2.5 py-0.5 rounded-full"
	const className = props.accent ? accentClassName : noAccentClassName
	return (
		<>
			{
				props.href ?
					<Link href={props.href} className={className}>
						{props.text}
					</Link>
					: <div className={className}>
						{props.text}
					</div>
			}
		</>
	)
}