import {cn} from "@/lib/utils";
import {Label} from "@/components/shadcn/ui/label";
import {TranslationFunctionType} from "@/interfaces/translationFunctionType";

export default function InputMessage({
  className = '',
  message,
  t,
  type = 'info',
}: {
  message?: string | string[]
  type?: 'error' | 'info' | 'success',
  t?: TranslationFunctionType,
  className?: string
}) {
  const color = type == 'info' ? 'text-gray-500'
    : type == 'error' ? 'text-red-700'
      : 'text-green-700'
  return <Label className={cn(color, className)}>{
    (Array.isArray(message) ? message : []).map(
      (v) => `${t ? t(v) : v}\n`
    )
  }</Label>
}