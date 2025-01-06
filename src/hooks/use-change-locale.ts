import {Locale} from "@/lib/types";
import {usePathname, useRouter} from "@/i18n/routing";


export const useChangeLocale = () => {
    const pathname = usePathname();
    const router = useRouter();

    const changeLocale = (newLocale: Locale) => {
        router.replace(pathname, { locale: newLocale });
    };
    return { changeLocale };
}