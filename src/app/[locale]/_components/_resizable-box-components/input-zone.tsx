"use client"
import {Label} from "@/components/ui/label";
import { Link, Upload} from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { useEffect, useRef, useState} from "react";
import {getBaseImage} from "@/lib/indexedDB";
import Image from "next/image";
import {useMandocContext} from "@/context/mandoc-ocr-context";
import {useImageUpload} from "@/hooks/use-image-upload";
import {TUrl, urlSchema} from "@/lib/schema";
import {Progress} from "@/components/ui/progress";
import {toast} from "@/hooks/use-toast";
import {ScrollArea} from "@/components/ui/scroll-area";

function InputZone() {
    const t = useTranslations("main.main-box.input-zone");
    const [renderedImage, setRenderedImage] = useState<Blob | null>(null)
    const [url, setUrl] = useState<TUrl>("");
    const [isValidUrl, setIsValidUrl] = useState<boolean>(true);
    const { image} = useMandocContext();
    const locale = useLocale()
    const imageRef = useRef<HTMLImageElement>(null);
    const {handleUpload, handleUrlUpload, state} = useImageUpload();
    const handleRenderImage = async () => {
        const imageBlob = await getBaseImage(image);
        if(imageBlob)
            setRenderedImage(imageBlob);
    }
    useEffect(() => {
        if(image){
            handleRenderImage()
        }
    }, [image])
    useEffect(() => {
        if(renderedImage && imageRef.current) {
            imageRef.current.src = URL.createObjectURL(renderedImage);
        }
    }, [renderedImage])
    useEffect(() => {
        if(url){
            const res = urlSchema.safeParse(url)
            if(res.success)
                setIsValidUrl(true);
            else
                setIsValidUrl(false);
        }else {
            setIsValidUrl(true);
        }
    }, [url]);
    useEffect(() => {
        if(state.error){
            toast({
                title: t('toast.error.title'),
                description: t('toast.error.message'),
            })
        }
    }, [state.error]);
    return (
        <ScrollArea className={'w-full h-full'} style={{direction: locale === 'ar'? "rtl": "ltr"}}>
            <div className={"p-6 h-full w-full flex items-center flex-col justify-start gap-2"}>
                <Label htmlFor={"upload-image"}
                       className={"group cursor-pointer rounded-xl border-primary border-dashed border-2 min-h-48 w-full h-full p-4 flex items-center justify-center gap-2 hover:border-emerald-500"}>
                    {
                        renderedImage
                            ? (
                                <Image className={"h-full object-contain"} ref={imageRef} src={""} alt={"input-image"}
                                       width={600} height={600}/>
                            )
                            : (
                                <>
                                    <Upload size={32} className={"group-hover:text-emerald-500"}/>
                                    <span className={"group-hover:text-emerald-500"}>{t('label')}</span>
                                </>
                            )
                    }
                </Label>
                <div className={"flex items-center justify-center gap-1 flex-row flex-wrap w-full"}>
                    <Input type={"text"} value={url} onChange={(e) => setUrl(e.target.value)}
                           placeholder={"https://www.example.com?res=1"} className={"max-w-64"}/>
                    <Button disabled={!isValidUrl || !url} onClick={() => handleUrlUpload(url)} className={""}>
                        <Link/>
                        {state.loading && !state.error ? t('button.uploading') : t('button.upload')}
                    </Button>
                </div>
                {
                    state.loading && !state.error && (
                        <div className={"flex items-center justify-center gap-0.5"}>
                            <Progress value={state.progress} className={"min-w-36"}/> {state.progress}%
                        </div>
                    )
                }
                {
                    !isValidUrl && (
                        <p className={"text-red-500"}>
                            {t('error.url')}
                        </p>
                    )
                }
                <input onChange={handleUpload} id={"upload-image"} type={"file"} accept={"image/*"} name={"image"}
                       className={"hidden"}/>
            </div>
        </ScrollArea>
    );
}

export default InputZone;