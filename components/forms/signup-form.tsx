'use client'
import Link from "next/link";
import {toast} from "sonner";
import {signup} from "@/actions/signup";
import {useTranslations} from "next-intl";
import {Label} from "@/components/shadcn/ui/label";
import React, {useState, useActionState} from "react";
import {InputCustom} from "@/components/shadcn/ui/input-custom";
import InputPassword from "@/components/shadcn/ui/input-password";
import LoadingButton from "@/components/shadcn/ui/loading-button";
import {Card, CardTitle, CardHeader, CardContent, CardDescription} from "@/components/shadcn/ui/card";

import InputLimit from "../shadcn/ui/input-limit";
import {isErrorsIncluded} from "@/lib/utils";
import InputMessage from "@/components/custom/InputMessage";

export default function SignupForm() {
	const t = useTranslations('SignupPage')
	const t_api = useTranslations('Api')
	const [state, action, pending] = useActionState(signup, undefined)
	const [getEmail, setEmail] = useState("")

	function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value)
	}

	React.useEffect(() => {
		if (!state)
			return;

		if (state?.message)
			toast(t_api(state?.message))
	}, [state, t_api]);

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
									<div className="flex items-center">
										<Label htmlFor="nickname">{t('nickname_field_title')}</Label>
										<InputMessage
											t={t_api}
											type='error'
											className="ml-auto text-right"
											message={state?.errors?.nickname}
										/>
									</div>
									<InputLimit
										required
										type="text"
										id="nickname"
										maxLength={15}
										name="nickname"
										className={isErrorsIncluded(state?.errors, 'nickname') ? "border-red-500" : ""}
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="email">{t('email_field_title')}</Label>
										<InputMessage
											t={t_api}
											type='error'
											className="ml-auto text-right"
											message={state?.errors?.email}
										/>
									</div>
									<InputCustom
										required
										id="email"
										name="email"
										type="email"
										value={getEmail}
										placeholder="m@example.com"
										onChange={handleChangeEmail}
										className={isErrorsIncluded(state?.errors, 'email') ? "border-red-500" : ""}
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
										className={isErrorsIncluded(state?.errors, 'password') ? "border-red-500" : ""}
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