import MainBox from "@/app/[locale]/_components/main-box";
import TopMenu from "@/app/[locale]/_components/top-menu";

export default  function Page() {
    return (
        <>
            <TopMenu />
            <MainBox className={"w-full h-full"}/>
        </>
    );
}
