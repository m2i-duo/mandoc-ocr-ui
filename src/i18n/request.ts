import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: {
        ...(await import(`../../messages/${locale}/home-page.json`)).default,
        ...(await import(`../../messages/${locale}/about-page.json`)).default,
        ...(await import(`../../messages/${locale}/contact-page.json`)).default,
        ...(await import(`../../messages/${locale}/special-mentions-page.json`)).default,
        ...(await import(`../../messages/${locale}/text-editor-page.json`)).default,
        },
    };
});