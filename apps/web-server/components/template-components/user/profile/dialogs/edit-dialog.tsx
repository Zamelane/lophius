"use client";

import Image from "next/image";
import { UserInfo } from "@/interfaces";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/text-area";
import { X, Edit, Check, ImagePlus } from "lucide-react";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useId, Dispatch, useState, SetStateAction } from "react";
import { useCharacterLimit } from "@/components/ui/input-limit/use-character-limit";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

type PropsType = {
  data: UserInfo,
  className: string|undefined
}

export default function EditProfileDialog({
  data,
  ...props
}: PropsType) {
  const id = useId();

  const maxLength = 180;
  const {
    value,
    handleChange,
    characterCount,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
    initialValue:
      data.bio ?? ""
  });

  const [userName,    setUserName     ] = useState(data.nickname)
  const [email,       setEmail        ] = useState(data.email)
  const [aboutMe,     setAboutMe      ] = useState(value)

  const [avatarId,    setAvatarId     ] = useState(data.avatar?.id)
  const [backgroidId, setBackgroidId  ] = useState(data.background?.id)

  const [isLoading,   setIsLoading    ] = useState(false)

  const t = useTranslations('ProfilePage')
  //const [state, formAction, pending] = useActionState(createUser, initialState)

  function save() {
    
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" {...props}><Edit/> {t('edit_button_text')}</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base">
            {t('edit_profile')}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Make changes to your profile here. You can change your photo and set a username.
        </DialogDescription>
        <div className="overflow-y-auto">
          <ProfileBg id={backgroidId} setId={setBackgroidId} />
          <Avatar id={avatarId} setId={setAvatarId} />
          <div className="px-6 pb-6 pt-4">
            <form className="space-y-4">
              {/* <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-first-name`}>First name</Label>
                  <Input
                    required
                    type="text"
                    placeholder="Matt"
                    id={`${id}-first-name`}
                    defaultValue="Margaret"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-last-name`}>Last name</Label>
                  <Input
                    required
                    type="text"
                    placeholder="Welsh"
                    id={`${id}-last-name`}
                    defaultValue="Villard"
                  />
                </div>
              </div> */}
              <div className="space-y-2">
                <Label htmlFor={`${id}-username`}>{t('nickname')}</Label>
                <div className="relative">
                  <Input
                    required
                    type="text"
                    value={userName}
                    id={`${id}-username`}
                    className="peer pe-9"
                    placeholder="ExampleName"
                    onChange={v => setUserName(v.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <Check
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="text-emerald-500"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-website`}>{t('email')}</Label>
                <div className="flex shadow-sm">
                  <Input
                    type="email"
                    value={email}
                    id={`${id}-email`}
                    placeholder="example@mail.ru"
                    onChange={v => setEmail(v.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-bio`}>{t('about_me')}</Label>
                <Textarea
                  value={aboutMe}
                  id={`${id}-bio`}
                  maxLength={maxLength}
                  aria-describedby={`${id}-description`}
                  placeholder={t('about_me_placeholder')}
                  onChange={v => {
                    setAboutMe(v.target.value)
                    handleChange(v)
                  }}
                />
                <p
                  role="status"
                  aria-live="polite"
                  id={`${id}-description`}
                  className="mt-2 text-right text-xs text-muted-foreground"
                >
                  <span className="tabular-nums">{limit - characterCount}</span> {t('characters_left')}
                </p>
              </div>
            </form>
          </div>
        </div>
        <DialogFooter className="border-t border-border px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {t('cancel')}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={save}>{t('save_changes')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ProfileBg({ id, setId }: { id: number|undefined, setId: Dispatch<SetStateAction<number|undefined>> }) {
  const [hideDefault, setHideDefault] = useState(false);
  const { previewUrl, fileInputRef, handleRemove, handleFileChange, handleThumbnailClick } =
    useImageUpload();

  const currentImage = previewUrl || (!hideDefault ? '/api/assets/' + id : null);

  const handleImageRemove = () => {
    handleRemove();
    setHideDefault(true);
  };

  async function changeImg(event: React.ChangeEvent<HTMLInputElement>) {
    const result = await handleFileChange(event)
    if (result)
      setId(result.id!)
  }

  return (
    <div className="h-32">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted">
        {currentImage && (
          <Image
            width={512}
            height={96}
            src={currentImage}
            className="h-full w-full object-cover"
            alt={previewUrl ? "Preview of uploaded image" : "Default profile background"}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleThumbnailClick}
            aria-label={currentImage ? "Change image" : "Upload image"}
            className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
          >
            <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          {currentImage && (
            <button
              type="button"
              aria-label="Remove image"
              onClick={handleImageRemove}
              className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
            >
              <X size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={changeImg}
        aria-label="Upload image file"
      />
    </div>
  );
}

function Avatar({ id, setId }: { id: number|undefined, setId: Dispatch<SetStateAction<number|undefined>> }) {
  const { previewUrl, fileInputRef, handleFileChange, handleThumbnailClick } = useImageUpload();

  const currentImage = previewUrl || '/api/assets/' + id;

  async function changeImg(event: React.ChangeEvent<HTMLInputElement>) {
    const result = await handleFileChange(event)
    if (result)
      setId(result.id!)
  }

  return (
    <div className="-mt-10 px-6">
      <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10">
        {currentImage && (
          <Image
            width={80}
            height={80}
            src={currentImage}
            alt="Profile image"
            className="h-full w-full object-cover"
          />
        )}
        <button
          type="button"
          onClick={handleThumbnailClick}
          aria-label="Change profile picture"
          className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
        >
          <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={changeImg}
          aria-label="Upload profile picture"
        />
      </div>
    </div>
  );
}