import Link from "next/link";
import Image from "next/image";
import {Tag} from "@/components/template-components/media/page-info/tags/tag";
import {TagContainer} from "@/components/template-components/media/page-info/tags/tag-container";

export function CinemaInfoTab() {
	return (
		<div className="flex flex-col gap-4 pt-2 min-w-0 max-w-full">

			<TagContainer>
				<Tag accent text="фильм" href="/tv/catalog?type=cinema"/>
				<Tag text="комедия" href="/tv/catalog?genre=comedy"/>
			</TagContainer>

			<div className="flex flex-col gap-2">
				<h6 className="text-lg font-semibold">
					Описание
				</h6>
				<p className="text-sm">
					После загадочной смерти король Грей снова родился на свет уже в другом мире — на магическом материке Дикатен под именем Артур Лейвин. Впрочем, пусть и запертый в теле младенца, свою мудрость король не растерял. Потихоньку обучаясь в магии и прокладывая путь в светлое будущее, теперь уже Артур вознамерился исправить ошибки, совершённые в прошлой жизни.
				</p>
			</div>

			<div className="flex flex-wrap gap-4">
				<div className="flex flex-col gap-2">
					<h6 className="text-lg font-semibold">
						Телесеть
					</h6>
					<div className="flex flex-wrap gap-1">
						<Link href="/tv-network/123"
									className="rounded-full inline-flex gap-1 items-center border transition-colors focus:outline-none border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs font-medium pr-1.5">
							<Image
								alt="ATX"
								width={20}
								height={20}
								className="rounded-full w-[20px] h-[20px] border-secondary border-[1px] bg-background"
								src="https://media.themoviedb.org/t/p/h50_filter(negate,000,666)/fERjndErEpveJmQZccJbJDi93rj.png"
							/>
							{" AT-X"}
						</Link>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h6 className="text-lg font-semibold">
						Трекеры
					</h6>
					<div className="flex flex-wrap gap-1">
						<Link href="/trackers/123"
									className="rounded-full inline-flex gap-1 items-center border transition-colors focus:outline-none border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs font-medium pr-1.5">
							<Image
								alt="TMDB"
								width={20}
								height={20}
								className="rounded-full w-[20px] h-[20px] border-secondary border-[1px] bg-background"
								src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
							/>
							{" TMDB"}
						</Link>
					</div>
				</div>
			</div>

		</div>
	)
}