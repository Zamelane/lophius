'use client'

import Image from "next/image";
import { useState } from "react";
import { PhotoSlider } from "react-photo-view/src";

type MediaPosterProps = {
	posters: Array<{
		src: string;
		width?: number;
		height?: number;
		fill?: boolean;
	}>;
	postersCount: number;
	className?: string;
};

export function MediaPoster({ posters, postersCount, className = "" }: MediaPosterProps) {
	const [visible, setVisible] = useState(false);
	const [index, setIndex] = useState(0);

	if (!posters || posters.length === 0) {
		return null;
	}

	return (
		<>
			<div
				onClick={() => setVisible(true)}
				className={`relative aspect-[5/7] rounded-[4px] ${className}`}
			>
				<div className="inline-flex flex-shrink-0 items-center border font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-[10px] px-1.5 py-0.5 rounded-full absolute top-1 right-1 z-10">
					{postersCount} обложек
				</div>
				<div className="cursor-pointer">
					<Image
						alt="Обложка"
						className="object-cover rounded-[4px] w-full h-full"
						{...posters[0]}
					/>
				</div>
			</div>

			<PhotoSlider
				index={index}
				speed={() => 500}
				visible={visible}
				onIndexChange={setIndex}
				onClose={() => setVisible(false)}
				images={posters.map((poster, idx) => ({
					src: poster.src,
					key: idx.toString(),
					width: poster.width,
					height: poster.height
				}))}

			/>
		</>
	);
}