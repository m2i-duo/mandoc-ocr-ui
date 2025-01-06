import React from 'react';
import {Quote} from "lucide-react";
import Image from "next/image";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Link} from "@/i18n/routing";
import {useTranslations} from "next-intl";
function Page() {
    const t = useTranslations("about");
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <h1 className="text-4xl font-bold flex items-center justify-center gap-1"><Quote /> {t("title")}</h1>
                <p className="text-lg max-w-[600px] text-justify opacity-60">
                    {t("description")}
                </p>
                <div className={"mt-16 flex items-center justify-center gap-4"}>
                    <Avatar src={"/assets/images/ayoub.jpg"} alt={"AB"} description={"Bouarour Ayoub @Codeonym"} link={"https://github.com/codeonym"}/>
                    <Avatar src={"/assets/images/ibrahim.jpeg"} alt={"OI"} description={"Oufkir Ibrahim @OufkirIbrahim"} link={"https://github.com/oufkirIbrahim"}/>
                    <Avatar src={"/assets/images/nabil.jpg"} alt={"OI"} description={"Chabab Nabil @ChababNabil"} link={"https://www.linkedin.com/in/nabil-chabab-87a1a4285"}/>
                </div>
            </div>
        </div>
    );
}

const Avatar = ({src, alt, description, link}: {src: string, alt: string, description: string, link: string}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Link href={link}>
                        <Image className={"rounded-full w-24 h-24 object-cover shadow-md"} alt={alt} width={120} height={120} src={src} />
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
export default Page;