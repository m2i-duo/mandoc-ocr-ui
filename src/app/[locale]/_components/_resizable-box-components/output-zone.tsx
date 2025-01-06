"use client"
import { PrinterCheck} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useLocale, useTranslations} from "next-intl";
import ChunkOutput from "@/app/[locale]/_components/chunk-output";
import {Separator} from "@/components/ui/separator";
import MergedOutput from "@/app/[locale]/_components/merged-output";
import {useMandocContext} from "@/context/mandoc-ocr-context";

function OutputZone() {
    const {renderMode, splitChunks} = useMandocContext()
    const t = useTranslations("main.main-box.output-zone");
    const locale = useLocale()
    return (
        <ScrollArea className={"p-4 h-full  w-full flex items-center flex-col justify-start "} style={{direction: locale === "ar" ? "rtl": "ltr"}}>
            <div className={"font-bold text-lg w-full py-4 flex items-center gap-1 justify-start"}>
                <PrinterCheck size={20}/>
                {t('title')}
            </div>
            {renderMode === "MERGED" && <MergedOutput />}
            {renderMode === "SPLIT" && (
                <div className={"pt-12"}>
                    {
                        splitChunks?.map((chunk, idx) => {
                            return (
                                <>
                                    <ChunkOutput key={idx} src={chunk.image} label={chunk.label}/>
                                    <Separator className={"my-2"}/>
                                </>
                            )
                        })
                    }
                </div>
            )}
        </ScrollArea>
    );
}

export default OutputZone;