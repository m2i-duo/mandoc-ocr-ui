"use client"
import {Suspense} from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {ImageDown, ImagePlus, FilePenLine} from "lucide-react";
import {ToolTipButton} from "@/components/ui/tooltip-button";
import {LocaleToggle} from "@/components/locale-toggler";
import {ModeToggle} from "@/components/theme-toggler";
import {useTranslations} from "next-intl";
import {Label} from "@/components/ui/label";
import {Link} from "@/i18n/routing";
import {useImageUpload} from "@/hooks/use-image-upload";
import DownloadMenu from "@/app/[locale]/_components/download-menu";
import MemoryReboot from "@/app/[locale]/_components/memory-reboot";

function TopMenu() {
    const t = useTranslations("main.top-menu");
    const {handleUpload} = useImageUpload();
    return (
        <Suspense fallback={<Skeleton className="w-full h-24 sm:h-16" />}>
            <div className={"w-full h-24 sm:h-16 flex items-center justify-between shadow p-4"}>
                <div className="flex items-center gap-2">
                    <MemoryReboot />
                    <ToolTipButton tooltip={t("text-editor.tooltip")}>
                        <Link href={"/text-editor"} className={"cursor-pointer"}>
                            <FilePenLine className={"h-[1.2rem] w-[1.2rem]"}/>
                        </Link>
                    </ToolTipButton>
                    <ToolTipButton tooltip={t("upload.tooltip")}>
                        <input id={"upload-file"} onChange={handleUpload} type="file" className="hidden"/>
                        <Label htmlFor={"upload-file"} className="cursor-pointer">
                            <ImagePlus className={"h-[1.2rem] w-[1.2rem]"}/>
                        </Label>
                    </ToolTipButton>
                    <DownloadMenu />
                </div>
                <div className="flex items-center gap-2">
                    <LocaleToggle/>
                    <ModeToggle/>
                </div>
            </div>
        </Suspense>
    );
}



export default TopMenu;