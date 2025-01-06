"use client"
import {
    AArrowDown,
    AArrowUp,
    AlignCenter, AlignJustify,
    AlignLeft, AlignRight,
    Bold,
    Brush, ChevronsDownUp, ChevronsLeftRight, ChevronsRightLeft, ChevronsUpDown, Download,
    Highlighter,
    Italic, LetterText,
    PaintRoller,
    Pilcrow, Puzzle,
    Strikethrough,
    Type,
    Underline
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {useEffect, useRef, useState} from "react";
import {FONTS} from "@/lib/constants"
import {TFont} from "@/lib/types";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";
import html2canvas from "html2canvas";
import {ToolTipButton} from "@/components/ui/tooltip-button";
import {useImageUpload} from "@/hooks/use-image-upload";
import {useRouter} from "@/i18n/routing";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useTranslations} from "next-intl";

function Page() {
    const t = useTranslations("text-editor");
    const [font, setFont] = useState<TFont>()
    const [text, setText] = useState<string>("")
    const [textLength, setTextLength] = useState<number>(text.length)
    const [output, setOutput] = useState<string>()
    const [bold, setBold] = useState<boolean>(false)
    const [italic, setItalic] = useState<boolean>(false)
    const [strikethrough, setStrikethrough] = useState<boolean>(false)
    const [underline, setUnderline] = useState<boolean>(false)
    const [highlight, setHighlight] = useState<boolean>(false)
    const [color, setColor] = useState<string>("black")
    const [backgroundColor, setBackgroundColor] = useState<string>()
    const [fontSize, setFontSize] = useState<number>(12)
    const [lineHeight, setLineHeight] = useState<number>(24)
    const [wordSpacing, setWordSpacing] = useState<number>(4)
    const [textAlign, setTextAlign] = useState<"left" | "center" | "right" | "justify">("left")
    const divRef = useRef<HTMLDivElement>(null);
    const {handleBlobUpload} = useImageUpload()
    const router = useRouter()
    useEffect(() => {
        setTextLength(text.length)
    }, [text])
    const handleScreenshot = async () => {
        if (divRef.current) {
            const canvas = await html2canvas(divRef.current);
            const imgData = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = imgData;
            link.download = "screenshot.png";
            link.click();
        }
    };
    const handleImageUpload = async() => {
        if(divRef.current){
            const canvas = await html2canvas(divRef.current);
            canvas.toBlob( async (blob) => {
                if(blob){
                    await handleBlobUpload(blob)
                    router.replace("/")
                }
            })
        }
    }
    return (
        <section
            className={cn("grid md:grid-cols-2 items-center flex-wrap w-full h-full pt-12")}>
            <style jsx>{`
            ${FONTS.map(
                (f) => `
                    @font-face {
                    font-family: '${f.fontFace}';
                    src: url('${f.src}');
                    font-weight: ${f.weight};
                    }
                    :root {
                    ${f.variable}: '${f.fontFace}';
                    }
                    `).join("\n")}`}
            </style>

            {/*input box*/}
            <div className={"h-full p-4 space-y-1"}>
                <div className={"space-y-1"}>
                    <Label className={"flex items-center justify-start"} htmlFor={"input-text"}>
                        <Pilcrow/> {t('input.title')}
                    </Label>
                    <Textarea id={'input-text'} onChange={(e) => setText(e.target.value)}
                              className={"w-full h-60 resize-none"} placeholder={t('input.placeholder')} />
                    <div className={"flex items-center justify-end text-xs"}>
                        <span>
                            {textLength} {t('input.characters')}
                        </span>
                    </div>
                </div>
                <div className={"flex items-center justify-center gap-0.5 flex-wrap"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"}>
                                <Type/> {font?.fontFace || "Font"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                Fonts
                            </DropdownMenuLabel>
                            <ScrollArea className={"w-full h-60"}>
                                {FONTS.map((f) => (
                                    <DropdownMenuItem key={f.fontFace} onClick={() => setFont(f)}
                                                      style={{ fontFamily: `var(${f.variable})` }}>
                                        {f.fontFace}
                                    </DropdownMenuItem>
                                ))}
                            </ScrollArea>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ToggleGroup type="multiple">
                        <ToggleGroupItem onClick={() => setBold(prev => !prev)} value="bold" aria-label="Toggle bold">
                            <Bold className="h-4 w-4"/>
                        </ToggleGroupItem>
                        <ToggleGroupItem onClick={() => setItalic(prev => !prev)} value="italic"
                                         aria-label="Toggle italic">
                            <Italic className="h-4 w-4"/>
                        </ToggleGroupItem>
                        <ToggleGroupItem onClick={() => setUnderline(prev => !prev)} value="underline"
                                         aria-label="Toggle underline">
                            <Underline className="h-4 w-4"/>
                        </ToggleGroupItem>
                        <ToggleGroupItem onClick={() => setStrikethrough(prev => !prev)} value="strikethrough"
                                         aria-label="Toggle Strikethrough">
                            <Strikethrough className="h-4 w-4"/>
                        </ToggleGroupItem>
                        <ToggleGroupItem onClick={() => setHighlight(prev => !prev)} value={"highlight"}
                                         aria-label="Toggle highlight">
                            <Highlighter className="h-4 w-4"/>
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Button className={"flex items-center justify-center gap-1"} size={"icon"} variant={"ghost"}>
                        <Label htmlFor={"color"} className={"flex items-center justify-start"}>
                            <Brush className="h-4 w-4"/>
                        </Label>
                        <input type="color" id={"color"} value={color} onChange={(e) => setColor(e.target.value)}
                               className={"w-8 h-8 hidden"}/>
                    </Button>
                    <Button className={"flex items-center justify-center gap-1"} size={"icon"} variant={"ghost"}>
                        <Label htmlFor={"bgColor"} className={"flex items-center justify-start"}>
                            <PaintRoller className="h-4 w-4"/>
                        </Label>
                        <input type="color" id={"bgColor"} value={backgroundColor}
                               onChange={(e) => setBackgroundColor(e.target.value)} className={"w-8 h-8 hidden"}/>
                    </Button>
                    <ToggleGroup type="single" value={textAlign}>
                        <ToggleGroupItem onClick={() => setTextAlign("left")} value="left"
                                         aria-label="Toggle align left">
                            <AlignLeft className="h-4 w-4"/>
                        </ToggleGroupItem>
                        <ToggleGroupItem onClick={() => setTextAlign("center")} value="center"
                                         aria-label="Toggle align center">
                            <AlignCenter className="h-4 w-4"/>
                        </ToggleGroupItem>
                        <ToggleGroupItem onClick={() => setTextAlign("right")} value="right"
                                         aria-label="Toggle align right">
                            <AlignRight className="h-4 w-4"/>
                        </ToggleGroupItem>
                        <ToggleGroupItem onClick={() => setTextAlign("justify")} value="justify"
                                         aria-label="Toggle align justify">
                            <AlignJustify className="h-4 w-4"/>
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Button size={"icon"} onClick={() => setFontSize(prev => prev + 1)} variant={"ghost"}>
                        <AArrowUp className="h-4 w-4"/>
                    </Button>
                    <Button size={"icon"} onClick={() => setFontSize(prev => prev - 1)} variant={"ghost"}>
                        <AArrowDown className="h-4 w-4"/>
                    </Button>
                    <Button size={"icon"} onClick={() => setWordSpacing(prev => prev + 1)} variant={"ghost"}>
                        <ChevronsLeftRight className="h-4 w-4"/>
                    </Button>
                    <Button size={"icon"} onClick={() => setWordSpacing(prev => prev - 1)} variant={"ghost"}>
                        <ChevronsRightLeft className="h-4 w-4"/>
                    </Button>
                    <Button size={"icon"} onClick={() => setLineHeight(prev => prev + 1)} variant={"ghost"}>
                        <ChevronsUpDown className="h-4 w-4"/>
                    </Button>
                    <Button size={"icon"} onClick={() => setLineHeight(prev => prev - 1)} variant={"ghost"}>
                        <ChevronsDownUp className="h-4 w-4"/>
                    </Button>
                </div>
                <div className={"flex items-center justify-center"}>
                    <Button onClick={() => setOutput(text)}>
                        {t('input.button')}
                    </Button>
                </div>
            </div>
            {/*output box*/}
            <div className={"p-4 h-full space-y-1"}>
                <div className={"flex items-center justify-between"}>
                    <div className={"flex items-center justify-start gap-1"}>
                        <LetterText/> {t('output.title')}
                    </div>
                    {
                        output &&
                        <div className={"flex items-center justify-center"}>
                            <ToolTipButton onClick={handleScreenshot} tooltip={t('output.tooltip.download')}>
                                <Download  className={"h-4 w-4"}/>
                            </ToolTipButton>
                            <ToolTipButton onClick={handleImageUpload} tooltip={t('output.tooltip.use')}>
                                <Puzzle  className={"h-4 w-4"}/>
                            </ToolTipButton>
                        </div>
                    }
                </div>
                {
                    output ?
                    <div style={{backgroundColor: backgroundColor ? backgroundColor : "white"}}
                         className={cn("w-full p-4 h-full rounded-md shadow")}>
                        <div ref={divRef} className={"w-full p-4 pb-6 h-fit text-wrap break-words"} style={{
                            fontFamily: `var(${font?.variable})`,
                            fontWeight: bold ? "bold" : "normal",
                            fontStyle: italic ? "italic" : "normal",
                            textDecoration: underline ? "underline" : "none",
                            textDecorationLine: strikethrough ? "line-through" : "none",
                            color: color,
                            backgroundColor: highlight ? "yellow" : "inherit",
                            fontSize: `${fontSize}px`,
                            lineHeight: `${lineHeight}px`,
                            wordSpacing: `${wordSpacing}px`,
                            textAlign: textAlign
                        }}>
                            {output}
                        </div>
                    </div>
                        : <div>
                            {t('output.placeholder')}
                        </div>
                }
            </div>
        </section>
    );
}


export default Page;