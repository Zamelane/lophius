'use client'

import {useState} from "react";
import {Tab, CustomMenu} from "@/components/me-ui/custom-menu";
import {CinemaInfoTab} from "@/components/template-components/media/page-info/tabs/info-tab";

export function FilmInfo() {
	const tabs: Tab[] = [
		{
			id: 'info',
			title: 'Информация'
		}
	]
	const [selectedTab, setSelectedTab] = useState(tabs[0])
	return (
		<>
			<CustomMenu
				tabs={tabs}
				selected={selectedTab}
				setSelected={setSelectedTab}
			/>
			<div className="flex flex-grow pt-2 max-w-full">
				{
					selectedTab.id === 'info' &&
					<CinemaInfoTab/>
				}
			</div>
		</>
	)
}