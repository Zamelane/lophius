import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {TranslationFunctionType} from "@/interfaces/translationFunctionType";

export default function InputMessage({
  className = '',
  isMultiple = false,
  message,
  t,
  type = 'info',
}: {
  message?: string[]
  type?: 'error' | 'info' | 'success',
  t: TranslationFunctionType,
  className?: string,
  isMultiple?: boolean,
}) {
  const color = type == 'info' ? 'text-gray-500'
    : type == 'error' ? 'text-red-700'
      : 'text-green-700'

  if (!isMultiple)
    return <Label
      className={cn(color, className)}
      hidden={!message || message.length != 1}>
      {message ? t(message[0]) : null}
    </Label>

  return <ul className={cn(color, "list-disc list-inside")}>
    {
      !message || message.length < 2 ? null :
        message.map(
          (m) => (<li key={m}>
            <Label>{t(m)}</Label>
          </li>)
        )
    }
  </ul>
}