"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {ToolTipButton} from "@/components/ui/tooltip-button";
import { File, FileText, FileType, ImageDown} from "lucide-react";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import React from "react";
import {DownloadItem, SaveFormat} from "@/lib/types";
import {useMandocContext} from "@/context/mandoc-ocr-context";
import {cn, createDocxFile, createPdfFile, createTxtFile, downloadFile} from "@/lib/utils";
import {useTranslations} from "next-intl";
import {toast} from "@/hooks/use-toast";

const downloadItems: DownloadItem[] = [
    {
        icon:<FileText className={"h-[1.2rem] w-[1.2rem]"} />,
        name: "Word",
        description:"Microsoft Word Document",
        format: "docx",
    },
    {
        icon:<File className={"h-[1.2rem] w-[1.2rem]"} />,
        name: "PDF",
        description: "Portable Document Format",
        format: "pdf",
    },
    {
        icon:<FileType className={"h-[1.2rem] w-[1.2rem]"} />,
        name: "txt",
        description: "Text File",
        format: "txt",
    }
]
export function DownloadMenu() {
    const t = useTranslations("main.top-menu.download");
    const {saveFormat, image, setSaveFormat, mergedText, downloading, setDownloading} = useMandocContext()
    const handleDownload = async() => {
        try{
            setDownloading(true)
            // download tagged output in saveFormat
            let blob: Blob = new Blob()
            switch (saveFormat) {
                case "pdf":
                    blob = await createPdfFile(mergedText)
                    break
                case "docx":
                    blob = await createDocxFile(mergedText)
                    break
                case "txt":
                    blob = await createTxtFile(mergedText)
                    break
            }
            downloadFile(blob, `FILE-${image}.${saveFormat}`)
        }catch (err) {
            toast({
                title: t('toast.error.title'),
                description: `${t('toast.error.message')} ${image}.${saveFormat}`,
            })
        }
        setDownloading(false)
    }
    return (
        <Dialog >
            {
                mergedText.length > 0 ? (
                    <DialogTrigger asChild>
                        <div>
                            <DialogTriggerItem disabled={false} />
                        </div>
                    </DialogTrigger>
                ) : (
                    <DialogTriggerItem disabled={true} />
                )
            }
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t("title")}</DialogTitle>
                    <DialogDescription>
                        {t("description")}
                    </DialogDescription>
                </DialogHeader>
                <ToggleGroup type="single" defaultValue={saveFormat} value={saveFormat} className={"flex-wrap"}>
                    {
                        downloadItems.map((downloadItem: DownloadItem, idx) => {
                            return (
                                <ToggleGroupItem onClick={() => setSaveFormat(downloadItem.format as SaveFormat)} key={idx} className={"min-w-28"} variant={"default"} value={downloadItem.format}
                                                 aria-label={"Toggle " + downloadItem.name}>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className={"flex items-center justify-center gap-0.5"}>
                                                    {downloadItem.icon}
                                                    {downloadItem.name}
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    {t(`format.${downloadItem.format}`)}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </ToggleGroupItem>
                            )
                        })
                    }
                </ToggleGroup>
                <DialogFooter>
                    <Button type="submit" onClick={handleDownload} disabled={downloading}>{downloading ? t("action.downloading"): t("action.download")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DownloadMenu;
const DialogTriggerItem  = ({disabled= false}: {disabled: boolean}) => {
    const t = useTranslations("main.top-menu.download");
    return (
        <ToolTipButton tooltip={t("tooltip")} disabled={disabled}>
            <ImageDown className={cn("h-[1.2rem] w-[1.2rem]")}/>
        </ToolTipButton>
    )
}