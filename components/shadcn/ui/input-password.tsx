'use client';
import {cn} from "@/lib/utils";
import {useMemo, useState} from "react";
import {X, Eye, Check, EyeOff} from "lucide-react";
import {InputCustom} from "@/components/shadcn/ui/input-custom";

export default function InputPassword({
	className,
	enterAPassword,
	id,
	least1lowercase,
	least1number,
	least1uppercase,
	least8characters,
	mediumPassword,
	mustContain,
	name,
	required,
	strongPassword,
	weakPassword
}: {
	id: string|undefined,
	name: string,
	required?: boolean
	least8characters: string,
	least1number: string,
	least1lowercase: string,
	least1uppercase: string,
	mustContain: string,
	enterAPassword: string,
	weakPassword: string,
	mediumPassword: string,
	strongPassword: string,
	className: string
}) {
	const [password, setPassword] = useState("");
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	const checkStrength = (pass: string) => {
		const requirements = [
			{ regex: /.{8,}/, text: least8characters },
			{ regex: /[0-9]/, text: least1number},
			{ regex: /[a-z]/, text: least1lowercase },
			{ regex: /[A-Z]/, text: least1uppercase },
		];

		return requirements.map((req) => ({
			met: req.regex.test(pass),
			text: req.text,
		}));
	};

	const strength = checkStrength(password);

	const strengthScore = useMemo(() => {
		return strength.filter((req) => req.met).length;
	}, [strength]);

	const getStrengthColor = (score: number) => {
		if (score === 0) return "bg-border";
		if (score <= 1) return "bg-red-500";
		if (score <= 2) return "bg-orange-500";
		if (score === 3) return "bg-amber-500";
		return "bg-emerald-500";
	};

	const getStrengthText = (score: number) => {
		if (score === 0) return enterAPassword;
		if (score <= 2) return weakPassword;
		if (score === 3) return mediumPassword;
		return strongPassword;
	};

	return (
		<div>
			<div className="space-y-2">
				<div className="relative">
					<InputCustom
						id={id}
						name={name}
						value={password}
						required={required}
						placeholder="Password"
						aria-invalid={strengthScore < 4}
						className={cn("pe-9", className)}
						type={isVisible ? "text" : "password"}
						aria-describedby={`${id}-description`}
						onChange={(e) => setPassword(e.target.value.trim())}
					/>
					<button
						type="button"
						aria-pressed={isVisible}
						aria-controls="password"
						onClick={toggleVisibility}
						aria-label={isVisible ? "Hide password" : "Show password"}
						className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isVisible ? (
							<EyeOff size={16} strokeWidth={2} aria-hidden="true" />
						) : (
							<Eye size={16} strokeWidth={2} aria-hidden="true" />
						)}
					</button>
				</div>
			</div>

			<div
				aria-valuemin={0}
				aria-valuemax={4}
				role="progressbar"
				aria-valuenow={strengthScore}
				aria-label="Password strength"
				className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
			>
				<div
					style={{ width: `${(strengthScore / 4) * 100}%` }}
					className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
				></div>
			</div>

			<p id={`${id}-description`} className="mb-2 text-sm font-medium text-foreground">
				{getStrengthText(strengthScore)}. {mustContain}
			</p>

			<ul className="space-y-1.5" aria-label="Password requirements">
				{strength.map((req, index) => (
					<li key={index} className="flex items-center gap-2">
						{req.met ? (
							<Check size={16} aria-hidden="true" className="text-emerald-500" />
						) : (
							<X size={16} aria-hidden="true" className="text-muted-foreground/80" />
						)}
						<span className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}>
              {req.text}
							<span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
					</li>
				))}
			</ul>
		</div>
	);
}