import {CustomHandleResize, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";

export default function MainBox({className} : {className?: string}) {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className={cn(" rounded-lg md:min-w-[450px]", className)}
        >
            <ResizablePanel defaultSize={30}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={50} className={"pb-0.5 pe-0.5"}>
                        <Skeleton className="w-full h-full" />
                    </ResizablePanel>
                    <CustomHandleResize/>
                    <ResizablePanel defaultSize={50} className={"pt-0.5 pe-0.5"}>
                        <Skeleton className="w-full h-full" />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
            <CustomHandleResize />
            <ResizablePanel defaultSize={70} className={"ps-0.5"}>
                <Skeleton className="w-full h-full" />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}