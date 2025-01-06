"use client"
import {Textarea} from "@/components/ui/textarea";
import {Clipboard, ClipboardCheck} from "lucide-react";
import {ToolTipButton} from "@/components/ui/tooltip-button";
import {useMandocContext} from "@/context/mandoc-ocr-context";
import {useState} from "react";
import {useTranslations} from "next-intl";

function MergedOutput() {
    const {mergedText} = useMandocContext()
    const [copied, setCopied] = useState<boolean>(false)
    const t = useTranslations("main.main-box.output-zone.merged");
    const handleCopy = async() => {
        await navigator.clipboard.writeText(mergedText)
        setCopied(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        setCopied(false)
    }
    return (
        <div className={"mt-12 px-0.5 relative"}>
            <ToolTipButton tooltip={t('copy')} onClick={handleCopy} className={"absolute end-2 top-2"}>
                {
                    copied ? <ClipboardCheck className={"h-[1.2rem] w-[1.2rem]"}/> : <Clipboard className={"h-[1.2rem] w-[1.2rem]"}/>
                }
            </ToolTipButton>
            <Textarea value={mergedText} className={"w-full cursor-pointer min-h-44 p-4 resize-none pe-12"} placeholder={t('placeholder')} />
        </div>
    );
}

export default MergedOutput;