import { Fragment } from 'react';
import {useTranslations} from "next-intl";
import { mediaPaths } from '@/interfaces';
import { usePathname } from 'next/navigation';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbEllipsis,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const MAX_BREADCRUMB_LENGTH: number = 3;

const BreadcrumbLogic = () => {
	let paths: string = usePathname();

	const homePath = mediaPaths.find(v => paths.startsWith(v)) ?? '/'

	if (homePath !== '/')
		paths = paths.replaceAll(homePath, '/').replaceAll('//', '/')

	const separator: string = "/";
	const pathNames: string[] = paths.split(separator).filter(path => path !== "");
	const t = useTranslations()

	return (
		<Breadcrumb className="hidden sm:block">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href={homePath}>{t('HomePage.title')}</BreadcrumbLink>
				</BreadcrumbItem>
				{pathNames.length > MAX_BREADCRUMB_LENGTH && <BreadcrumbEllipsis />}
				{pathNames.slice(-MAX_BREADCRUMB_LENGTH).map((link, index) => {
					const href: string = `/${pathNames.slice(0, -MAX_BREADCRUMB_LENGTH + index + 1).join('/')}`;
					const linkName: string = link[0].toUpperCase() + link.slice(1);
					const isLastPath: boolean = pathNames.length === index + 1;

					return (
						<Fragment key={index}>
							<BreadcrumbSeparator/>
							<BreadcrumbItem>
								{!isLastPath ?
									<BreadcrumbLink href={href}>{t(`${linkName}.title`)}</BreadcrumbLink> :
									<BreadcrumbPage>{t(`${linkName}.title`)}</BreadcrumbPage>
								}
							</BreadcrumbItem>
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default BreadcrumbLogic;