import {useTranslations} from "next-intl";
import {Heart, Quote, TextQuote} from "lucide-react";
function Page() {
    const t = useTranslations("special-mentions");
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-1"><Heart color={"red"}/> {t("title")}</h1>
            <p className="text-lg max-w-[600px] text-justify opacity-60">
                <Quote className={" opacity-50 inline-block me-0.5"}/>
                {t("description")}
                <Quote className={" opacity-50 inline-block ms(0.5"}/>
            </p>
        </div>
    );
}

export default Page;