"use client"

import { usePathname, useRouter } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { Locale, useLocale, useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { startTransition } from "react"

export function LanguageSwitch() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const currentLocale = useLocale()
  const t = useTranslations("languages")

  const languages = [
    { code: "en" as Locale, name: t("english"), flag: "🇺🇸" },
    { code: "bn" as Locale, name: t("bengali"), flag: "🇧🇩" },
  ]

  function handleLocaleChange(locale: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { locale, scroll: false }
      )
    })
  }

  return (
    <div className="bg-background/80 flex max-w-fit items-center gap-1 rounded border p-1">
      {languages.map((language) => {
        const isActive = currentLocale === language.code

        return (
          <button
            key={language.code}
            onClick={() => handleLocaleChange(language.code)}
            className={cn(
              "flex h-6 items-center rounded-sm px-1.5 text-xs font-medium transition-all",
              {
                "bg-primary text-primary-foreground shadow-sm": isActive,
                "hover:bg-muted text-muted-foreground hover:text-foreground": !isActive,
              }
            )}
          >
            <span className="mr-1">{language.flag}</span>
            {language.code.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
