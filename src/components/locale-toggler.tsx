"use client"
import {APP_LOCALES} from "@/lib/constants";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useChangeLocale} from "@/hooks/use-change-locale";
import {Languages} from "lucide-react";
import * as React from "react";
import {useLocale, useTranslations} from "next-intl";

export function LocaleToggle() {
    const t = useTranslations("main.top-menu");
    const { changeLocale } = useChangeLocale();
    const locale = useLocale()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Languages className={"h-[1.2rem] w-[1.2rem]"} />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" style={{direction: locale === "ar" ? "rtl": "ltr"}}>
                {APP_LOCALES.map((locale) => (
                    <DropdownMenuItem key={locale} onClick={() => changeLocale(locale)}>
                        {t(`language.${locale}`)}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
