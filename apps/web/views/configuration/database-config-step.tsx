"use client"

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field} from "@/views/configuration/ui/field";
import {Button} from "@/components/shadcn/ui/button";
import {LockIcon, UserIcon, ServerIcon, DatabaseIcon} from "lucide-react";

type ExternalFormData = Partial<{
	dbHost: string
	dbName: string
	dbPassword: string
	dbPort: string
	dbUsername: string
}>

type Props = {
	onNext: () => void,
	onPrevious: () => void,
	updateFormData: (
		data: ExternalFormData,
	) => void,
	configData: ExternalFormData
}

export function DatabaseConfigStep({ configData, onNext, onPrevious, updateFormData }: Props) {
	const databaseConnectSchema = z.object({
		dbHost: z.string()
			.min(1, "Адрес подключения обязателен"),
		dbName: z.string()
			.min(1, "Название базы данных обязательно"),
		dbPassword: z.string()
			.min(1, "Пароль для подключения обязателен"),
		dbPort: z.string()
			.min(1, "Порт подключения обязателен")
			.regex(/^\d+$/, "Должно быть числом"),
		dbUsername: z.string()
			.min(1, "Имя пользователя для подключения обязательно"),
	})
	type FormData = z.infer<typeof databaseConnectSchema>

	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<FormData>({
		defaultValues: {
			dbHost: configData.dbHost,
			dbName: configData.dbName,
			dbPassword: configData.dbPassword,
			dbPort: configData.dbPort,
			dbUsername: configData.dbUsername
		},
		resolver: zodResolver(databaseConnectSchema),
	})

	const onSubmit = (data: FormData) => {
		updateFormData(data)
		onNext()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 animate-fadeIn">
			<Field id="dbHost"
						 label="Хост"
						 icon={ServerIcon}
						 error={errors.dbHost?.message}
						 placeholder="например, localhost или 127.0.0.1"
						 {...register("dbHost")}
			/>

			<Field min="0"
						 id="dbPort"
						 max="65535"
						 label="Порт"
						 type="number"
						 placeholder="5432"
						 error={errors.dbPort?.message}
						 {...register("dbPort")}
			/>

			<Field id="dbUsername"
						 icon={UserIcon}
						 label="Пользователь"
						 placeholder="postgres"
						 error={errors.dbUsername?.message}
						 {...register("dbUsername")}
			/>

			<Field label="Пароль"
						 icon={LockIcon}
						 id="dbPassword"
						 placeholder="postgres"
						 error={errors.dbPassword?.message}
						 {...register("dbPassword")}
			/>

			<Field id="dbName"
						 icon={DatabaseIcon}
						 label="База данных"
						 placeholder="lophius"
						 error={errors.dbName?.message}
						 {...register("dbName")}
			/>

			<div className="flex flex-row">
				<Button variant="outline"
								onClick={onPrevious}
								className="max-w-min mr-auto"
				>
					Назад
				</Button>
				<Button type="submit"
								className="max-w-min ml-auto"
				>
					Дальше
				</Button>
			</div>
		</form>
	)
}