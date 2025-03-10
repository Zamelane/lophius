import React from "react";
import {LayoutProps} from "@/interfaces";
import {Label} from "@/components/ui/label";
import InputMessage from "@/components/helps/InputMessage";
import {TranslationFunctionType} from "@/interfaces/translationFunctionType";

export default function FormInput({
  children,
  code,
  errors,
  t_api,
  title
}: LayoutProps & {
  errors: string[] | undefined,
  t_api: TranslationFunctionType,
  title: string,
  code: string
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center">
        <Label htmlFor={code}>{title}</Label>
        <InputMessage
          t={t_api}
          type='error'
          message={errors}
          className="ml-auto text-right"
        />
      </div>
      {children}
      <InputMessage
        t={t_api}
        type='error'
        message={errors}
        isMultiple={true}
        />
    </div>
  )
}