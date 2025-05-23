import { useState } from "react";
import { z } from "zod";
import { Button } from "@/src/shared/ui/shadcn/button";
import { Checkbox } from "@/src/shared/ui/shadcn/checkbox";
import { Input } from "@/src/shared/ui/shadcn/input";
import { Label } from "@/src/shared/ui/shadcn/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/src/shared/ui/shadcn/sheet";
import { Textarea } from "@/src/shared/ui/shadcn/textarea";
import { Spinner } from "@/src/shared/ui/shadcn/spinner";
import { List } from "../types";
import { WithOptional } from "database";
import { saveList } from "../services/saveList";
import { createList } from "../services/createList";
import { NotificationOnListUpdate } from "../views/lists";
import { LayoutProps } from "@/src/shared/types";

const schema = z.object({
  title: z.string().min(1, "Имя обязательно"),
  comment: z.string().max(500, "Слишком длинная заметка"),
});

type Props = WithOptional<List, 'id' | 'isSystem'> & LayoutProps & {
  isEdit?: boolean
  notificationOnListUpdate: (values: NotificationOnListUpdate) => void
}

export function EditListSheet({
  id,
  order,
  i18nTitle,
  title: oldTitle,
  comment: oldComment,
  isHidden: oldIsHidden,
  isEdit,
  isSystem,
  mediaType,
  notificationOnListUpdate,
  children
}: Props) {
  const [loading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState<string>(oldTitle);
  const [comment, setComment] = useState<string>(oldComment ?? "");
  const [isHidden, setIsHidden] = useState<boolean>(oldIsHidden ?? false);

  const [errors, setErrors] = useState<{ title?: string; comment?: string }>({});

  async function handleSubmit() {
    const result = schema.safeParse({ title, comment });

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const err of result.error.issues) {
        fieldErrors[err.path[0] as keyof typeof errors] = err.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      if (isEdit) {
        if (!id) return;
        await saveList({
          id,
          order,
          title,
          comment,
          isHidden,
          mediaType
        });
        notificationOnListUpdate({
          list: {
            id,
            title,
            comment,
            isHidden,
            isSystem: isSystem ?? false,
            i18nTitle,
            mediaType,
            order
          },
          type: 'update'
        });
      } else {
        const newId = await createList({
          order,
          title,
          comment,
          isHidden,
          mediaType
        });

        if (!newId) return;

        notificationOnListUpdate({
          list: {
            id: newId,
            title,
            comment,
            isHidden,
            isSystem: isSystem ?? false,
            i18nTitle,
            mediaType,
            order
          },
          type: 'add'
        });
      }

      setOpen(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="sm:max-w-sm min-w-[95%] sm:min-w-[400px] lg:min-w-[500px] p-4">
        <div className="flex flex-col flex-grow justify-between gap-4 min-h-full">
          <div className="flex flex-col gap-4">
            <SheetHeader>
              <SheetTitle className="text-xl">{isEdit ? 'Редактирование списка' : 'Новый список'}</SheetTitle>
            </SheetHeader>

            {isSystem && (
              <div className="flex gap-4 items-center relative w-full rounded-lg border p-4 [&>svg~*]:pl-7[&>svg]:text-foreground bg-blue-500/30 border-none text-foreground">
                <p className="text-sm">У системных списков нельзя изменить имя. Это нужно для более точного сбора статистики.</p>
              </div>
            )}

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title" className="text-sm flex items-center gap-1">
                Имя
                {!isSystem && <p className="text-base text-red-500 leading-3">*</p>}
              </Label>
              <Input
                type="text"
                id="title"
                placeholder="Введите имя списка"
                disabled={isSystem}
                value={title}
                onChange={(v) => setTitle(v.target.value)}
              />
              {!isSystem && errors.title && (
                <p className="text-xs text-red-500">{errors.title}</p>
              )}
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="comment" className="text-sm">Заметка</Label>
              <Textarea
                className="min-h-[80px]"
                placeholder="Заметка будет видна только вам, только на странице ваших списков"
                id="comment"
                value={comment}
                onChange={(v) => setComment(v.target.value)}
              />
              {errors.comment && (
                <p className="text-xs text-red-500">{errors.comment}</p>
              )}
            </div>

            <div className="items-top flex space-x-2 py-1">
              <Checkbox id="isHidden" checked={isHidden} onCheckedChange={(checked) => setIsHidden(Boolean(checked))} />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="isHidden">Скрытый список ?</Label>
                <p className="text-sm text-muted-foreground">О содержимом списка и его наличии будете знать только вы.</p>
              </div>
            </div>
          </div>

          <Button onClick={handleSubmit}>
            {loading
              ? <Spinner size='sm' className="bg-white dark:bg-black" />
              : isEdit
                ? 'Сохранить'
                : 'Добавить список'
            }
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
