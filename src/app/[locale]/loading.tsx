import {Skeleton} from "@/components/ui/skeleton";
import MainBoxSkeleton from "@/app/[locale]/_components/main-box-skeleton";

export default function Loading() {
    return (
        <main className="h-screen w-full sm:p-16 font-[family-name:var(--font-geist-sans)]">
            <div className="p-2 w-full h-full flex flex-col gap-2 items-center sm:items-start">
                <Skeleton className="w-full h-16 sm:h-16" />
                <section className={"w-full h-full flex items-center justify-center flex-col gap-2"}>
                    <Skeleton className="w-full h-24 sm:h-16" />
                    <MainBoxSkeleton className={"w-full h-full"}/>
                </section>
            </div>
        </main>
    );
}
