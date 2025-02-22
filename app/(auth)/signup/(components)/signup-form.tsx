'use client'
import Link from "next/link";
import {useActionState} from "react";
import {signup} from "@/actions/auth";
import {useTranslations} from "next-intl";
import {Label} from "@/components/ui/label";
import InputLimit from "@/components/ui/input-limit";
import {InputCustom} from "@/components/ui/input-custom";
import InputPassword from "@/components/ui/input-password";
import LoadingButton from "@/components/ui/loading-button";
import {Card, CardTitle, CardHeader, CardContent, CardDescription} from "@/components/ui/card";

export default function SignupForm() {
	const t = useTranslations('SignupPage')
	const [state, action, pending] = useActionState(signup, undefined)

	return (
		<div className={"flex flex-col gap-6"}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">{t('welcome_title')}</CardTitle>
					<CardDescription>{t('welcome_description')}</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={action}>
						<div className="grid gap-6">
							<div className="grid gap-6">
								<div className="grid gap-2">
									<Label htmlFor="nickname">{t('nickname_field_title')}</Label>
									<InputLimit
										required
										type="text"
										id="nickname"
										name="nickname"
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="email">{t('email_field_title')}</Label>
									<InputCustom
										required
										id="email"
										name="email"
										type="email"
										placeholder="m@example.com"
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="password">{t('password_field_title')}</Label>
									<InputPassword
										required
										id="password"
										name="password"
										mustContain={t('must_contain')}
										weakPassword={t('weak_password')}
										least1number={t('at_least_1_number')}
										mediumPassword={t('medium_password')}
										strongPassword={t('strong_password')}
										enterAPassword={t('enter_a_password')}
										least1lowercase={t('at_least_1_lowercase')}
										least1uppercase={t('at_least_1_uppercase')}
										least8characters={t('at_least_8_characters')}
									/>
								</div>
								<LoadingButton
									type="submit"
									text={t('signup')}
									isLoading={pending}
								/>
							</div>
							<div className="text-center text-sm">
								{t('have_account')}{" "}
								<Link href="/login" className="underline underline-offset-4">
									{t('sign_in')}
								</Link>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
				{t('by_clicking_continue')} <a href="#">{t('terms_of_service')}</a>{" "}
				{t('and')} <a href="#">{t('privacy_policy')}</a>.
			</div>
		</div>
	)
}