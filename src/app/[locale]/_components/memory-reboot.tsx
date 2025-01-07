"use client"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {ToolTipButton} from "@/components/ui/tooltip-button";
import {History, Trash, X} from "lucide-react";
import {useMandocContext} from "@/context/mandoc-ocr-context";
import {useEffect, useState} from "react";
import {ImageRecord} from "@/lib/types";
import {getAllImageRecords, removeImageRecord} from "@/lib/indexedDB";
import Image from "next/image";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useLocale, useTranslations} from "next-intl";
import {Button} from "@/components/ui/button";

export default function MemoryReboot() {
    const {image, setImage} = useMandocContext();
    const [history, setHistory] = useState<ImageRecord[]>([]);
    const [notify, setNotify] = useState<boolean>(false);
    const t = useTranslations("main.top-menu.memory-reboot");
    const locale = useLocale()
    useEffect(() => {
       const updateHistory = async() => {
           const history = await getAllImageRecords()
           setHistory(history)
       }
         updateHistory()
    }, [image, notify])

    const handleRemove = async(id: string) => {
        await removeImageRecord(id)
        setNotify((prev => !prev))
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <ToolTipButton tooltip={t("tooltip")}>
                    <History className={"h-[1.2rem] w-[1.2rem]"} />
                </ToolTipButton>
            </SheetTrigger>
            <SheetContent className={""} style={{direction: locale === "ar" ? "rtl" : "ltr"}} side={locale === "ar" ? "left": "right"}>
                <SheetHeader>
                    <SheetTitle className={"w-full text-start pt-8"}>{t("title")}</SheetTitle>
                    <SheetDescription>
                        {t("description")}
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className={"w-full h-full"}>
                    <div className="flex items-center justify-start flex-col gap-2 h-fit py-12">
                        {
                            history ? (
                                history.map((record, index) => (
                                    <div onClick={() => setImage(record.id)} key={index} className={"group relative flex items-center justify-center hover:scale-125 transition cursor-pointer hover:shadow w-48 h-36 "}>
                                        <Image className={" h-full object-contain"} src={URL.createObjectURL(record.base_image)} alt={record.id} width={120}
                                               height={80} key={index}/>
                                        <Button size={"icon"} className={"hidden hover:text-red-500 group-hover:flex absolute top-1 right-1"} onClick={() => handleRemove(record.id)} variant={"ghost"}>
                                            <Trash />
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <Label>{t("null")}</Label>
                            )
                        }
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
