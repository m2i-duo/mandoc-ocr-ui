import Image from "next/image";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Link} from "@/i18n/routing";
import {useTranslations} from "next-intl";
import {Github, Linkedin, Mail} from "lucide-react";
import {Button} from "@/components/ui/button";
function Page() {
    const t = useTranslations("contact");
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-1"><Mail/> {t("title")}</h1>
            <p className="text-lg max-w-[600px] text-justify opacity-60">
                {t("description")}
            </p>
            <div className={"flex items-center justify-center gap-1"}>
                <Button asChild={true} size={"icon"}>
                    <Link href={"https://www.linkedin.com/in/codeonym"}>
                        <Linkedin />
                    </Link>
                </Button>
                <Button asChild={true} size={"icon"}>
                    <Link href={"https://www.linkedin.com/in/oufkirIbrahim"}>
                        <Linkedin />
                    </Link>
                </Button>
                <Button asChild={true} size={"icon"}>
                    <Link href={"https://www.github.com/m2i-duo"}>
                        <Github />
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default Page;