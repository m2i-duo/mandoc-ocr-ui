import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import {APP_LOCALES} from "@/lib/constants";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: APP_LOCALES,

    // Used when no locale matches
    defaultLocale: APP_LOCALES[0]
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
    createNavigation(routing);