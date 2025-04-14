import { Heart } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function Footer() {
  return (
    <footer className="flex justify-center bg-background border-t-[1px] border-border mt-4">
      <div className="flex flex-col md:flex-row max-w-[1920px] w-full justify-between items-start gap-4 py-6 px-[16px] md:px-[16px]">
        <div className="flex flex-col gap-4">
          <h6 className="font-bold text-lg">lophius.zmln.ru</h6>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground flex items-center">
              Сервис коллекционирования медиа, сделанный с <span className="w-1"/> <Heart width={10} height={10}/>.
            </p>
            <p className="text-xs text-muted-foreground">
              Тут можно написать пару шуток, но как-нибудь потом ...
            </p>
            <p className="text-xs text-muted-foreground">
              Связаться со мной можно по почте — <a href="mailto:example@mail.ru" className="underline text-primary">example@mail.ru</a>
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-4">
            <h6 className="font-bold text-sm">Документы</h6>
            <div className="flex flex-col gap-1">
              <a href="/document/terms-of-use" className="text-xs text-secondary-foreground hover:underline">
                Пользовательское соглашение
              </a>
              <a href="/document/subscription-agreement" className="text-xs text-secondary-foreground hover:underline">
                Политика конфиденциальности
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="font-bold text-sm">Социальные сети</h6>
            <div className="flex gap-1">
              <a
                href="https://github.com/zamelane/lophius"
                className="inline-flex gap-2 items-center whitespace-nowrap rounded-md text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 font-medium hover:bg-accent hover:text-accent-foreground min-h-9 h-9 min-w-9 w-9 justify-center"
              >
                <GitHubLogoIcon/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}