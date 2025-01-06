import React, {Suspense} from 'react';
import LogoToggle from "@/components/logo-toggler";
import {Skeleton} from "@/components/ui/skeleton";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {headerNavLinks} from "@/config/navigation/header-nav-links";
import {Link} from "@/i18n/routing";
import {ExternalLinkIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {useLocale, useTranslations} from "next-intl";

function Header() {
    const t = useTranslations("main");
    const locale = useLocale()
    return (
        <Suspense fallback={<Skeleton className="w-full h-24 sm:h-20" />}>
            <div
                className="shadow-md w-full h-20 py-6 px-8 bg-[color:var(--geist-background)] flex items-center justify-between">
                <LogoToggle/>
                <NavigationMenu>
                    <NavigationMenuList style={{direction: locale === "ar" ? "rtl": "ltr"}}>
                        {
                            headerNavLinks.map((navLink, idx) => (
                                <NavigationMenuItem key={idx}>
                                    <Link target={navLink.external ? "_blank" : ""} href={navLink.href} legacyBehavior passHref>
                                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "flex items-center justify-center gap-0.5")}>
                                            {t(navLink.i18nIndex)} {navLink.icon} {navLink.external && <ExternalLinkIcon className={"h-[1.2rem] w-[1.2rem]"} />}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))
                        }
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </Suspense>
    );
}

export default Header;