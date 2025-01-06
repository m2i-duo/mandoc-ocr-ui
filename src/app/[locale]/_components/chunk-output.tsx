import Image from "next/image";

function ChunkOutput({src, label}: {src: string, label: string}) {
    return (
        <div className={"flex items-center justify-between px-4"}>
            <Image src={src} className={"px-6 py-2"} alt={"ait"} width={100} height={100}/>
            <p>
                {label}
            </p>
        </div>
    );
}

export default ChunkOutput;