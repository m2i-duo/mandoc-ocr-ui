import {ReactNode} from "react";
import {Heart} from "lucide-react";

export const headerNavLinks: TNavLink[] = [
    {
        href: '/docs',
        title: 'Docs',
        i18nIndex: 'header-nav-links.docs',
    },
    {
        href: '/about',
        title: 'about',
        i18nIndex: 'header-nav-links.about',
    },
    {
        href: '/contact',
        title: 'contact',
        i18nIndex: 'header-nav-links.contact',
    },
    {
        href : "/special-mentions",
        title : "special-mentions",
        icon: <Heart color={"red"} className={"w-[1.2rem] h-[1.2rem]"} />,
        i18nIndex: "header-nav-links.special-mentions"
    },
    {
        external: true,
        href: "https://github.com/m2i-duo/mandoc-ocr-api",
        title: "Source code",
        i18nIndex: "header-nav-links.source-code",
    }
]

type TNavLink = {
    external?: boolean;
    href: string;
    i18nIndex: string;
    title: string;
    icon?: ReactNode;
}