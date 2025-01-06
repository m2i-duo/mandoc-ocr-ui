import {
    CustomHandleResize,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import {cn} from "@/lib/utils";
import InputZone from "@/app/[locale]/_components/_resizable-box-components/input-zone";
import SettingsZone from "@/app/[locale]/_components/_resizable-box-components/settings-zone";
import OutputZone from "@/app/[locale]/_components/_resizable-box-components/output-zone";

export default function MainBox({className} : {className?: string}) {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className={cn("shadow-md rounded-lg md:min-w-[450px]", className)}
        >
            <ResizablePanel defaultSize={30}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={50} className={"pb-1.5 pe-1.5"}>
                        <InputZone />
                    </ResizablePanel>
                    <CustomHandleResize/>
                    <ResizablePanel defaultSize={50} className={"pt-1.5 pe-1.5"}>
                        <SettingsZone />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
            <CustomHandleResize />
            <ResizablePanel defaultSize={70} className={"ps-1.5"}>
                <OutputZone />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
