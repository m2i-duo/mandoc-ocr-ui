"use client"
import {Button} from "@/components/ui/button";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {MODELS, RENDER_MODES} from "@/lib/constants";
import {Model, ModelDetails, RenderModeDetails} from "@/lib/types";
import {useMandocContext} from "@/context/mandoc-ocr-context";
import {useLocale, useTranslations} from "next-intl";
import {Box, Cast} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";
import {getBaseImage} from "@/lib/indexedDB";
import {convertBase64ToBlob, convertBlobToFile} from "@/lib/utils";
import {MandocDtoMapper} from "@/lib/mandoc-mapper";
import {MANDOCAPI_ENDPOINTS} from "@/config/endpoints/mandoc-api-endpoints";
import {toast} from "@/hooks/use-toast";

function SettingsZone() {
    const {model, image, setModel, setMergedText, setSplitChunks, loading, setLoading, renderMode, setRenderMode} = useMandocContext()
    const t = useTranslations("main.main-box.settings-zone");
    const locale = useLocale()
    const handleClick = async() => {
        try{
            setLoading(true)
            const imageBlob = await getBaseImage(image);
            if(imageBlob){
                const imageFile: File = await convertBlobToFile(imageBlob, image);
                const mapper = new MandocDtoMapper();
                const formData = new FormData();
                formData.append("image", imageFile);
                const res = await fetch(MANDOCAPI_ENDPOINTS.models(model).mode(renderMode).analyze, {
                    method: "POST",
                    body: formData
                })
                if(res.ok){
                    const data = await res.json();
                    if(renderMode === "MERGED"){
                        const textObj = mapper.mapMergedResponseDto(data);
                        setMergedText(textObj?.text || "")
                    }
                    if(renderMode === "SPLIT") {
                        const splits = mapper.mapSplitResponseDto(data)?.map(async (chunk) => {
                            const blob = await convertBase64ToBlob(chunk.image);
                            const url = URL.createObjectURL(blob);
                            return {
                                image: url,
                                label: chunk.label
                            };
                        }) || [];
                        const splitChunks = await Promise.all(splits);
                        if(splitChunks)
                            setSplitChunks(splitChunks)
                    }
                }
            }
        }catch(err) {
            toast({
                title: t('toast.error.title'),
                description: t('toast.error.message'),
            })
            console.error(err)
        }

        setLoading(false)
    }
    return (
        <ScrollArea className={"w-full h-full"} style={{direction: locale === "ar" ? "rtl" : "ltr"}}>
            <div className={"p-4 w-full h-full flex items-center flex-col justify-center gap-4 "}>
                <div className={"flex items-start justify-center gap-1 flex-col"}>
                    <div className={"font-bold flex items-center justify-start gap-1"}>
                        <Box/>
                        <span>{t('model.label')}</span>
                    </div>
                    <ToggleGroup defaultValue={model} value={model} type="single" className={"flex-wrap"}>
                        {
                            Object.entries(MODELS).map(([key, value]: [string, ModelDetails]) => {
                                return (
                                    <ToggleGroupItem onClick={() => setModel(key as Model)} key={key}
                                                     className={"min-w-28"}
                                                     variant={"default"} value={key}
                                                     aria-label={"Toggle " + value.name}>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <p>
                                                        {value.name}
                                                    </p>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        {value.description}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </ToggleGroupItem>
                                )
                            })
                        }
                    </ToggleGroup>
                </div>
                <div className={"flex items-start justify-center gap-1 flex-col"}>
                    <div className={"font-bold flex items-center justify-start gap-1"}>
                        <Cast/>
                        <span><span>{t('render-mode.label')}</span></span>
                    </div>
                    <ToggleGroup defaultValue={renderMode} value={renderMode} type="single" className={"flex-wrap"}>
                        {
                            RENDER_MODES.map((mode: RenderModeDetails, idx) => {
                                return (
                                    <ToggleGroupItem onClick={() => setRenderMode(mode.value)} key={idx}
                                                     className={"min-w-28"}
                                                     variant={"default"} value={mode.value}
                                                     aria-label={"Toggle " + mode.name}>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <p>
                                                        {mode.name}
                                                    </p>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        {mode.description}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </ToggleGroupItem>
                                )
                            })
                        }
                    </ToggleGroup>
                </div>
                <Separator className="mt-3"/>
                <Button onClick={handleClick}>
                    {loading ? t("action.analyzing") : t("action.analyze")}
                </Button>
            </div>
        </ScrollArea>
    );
}

export default SettingsZone;