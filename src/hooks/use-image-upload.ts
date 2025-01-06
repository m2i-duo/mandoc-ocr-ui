"use client"

import {ChangeEvent} from "react";
import {generateRandomUUid} from "@/lib/utils";
import {storeImageRecord} from "@/lib/indexedDB";
import {useMandocContext} from "@/context/mandoc-ocr-context";

export const useImageUpload = () => {
    const {setImage} = useMandocContext();

    const handleUpload = async(e: ChangeEvent<HTMLInputElement>) => {
        try{
            const file = e.target.files?.[0];
            if(!file) return;
            const randomID = generateRandomUUid()
            const imageBlob = new Blob([file], {type: file?.type});
            await storeImageRecord({id: randomID, base_image: imageBlob});
            setImage(randomID);
        }catch (err){
            console.error(err);
        }
    }
    const handleUrlUpload = async (url: string) => {
        try{
            const randomID = generateRandomUUid()
            const response = await fetch(url);
            const blob = await response.blob();
            await storeImageRecord({id: randomID, base_image: blob});
            setImage(randomID);
        }catch (err) {
            console.error(err);
        }
    }
    const handleBlobUpload = async (blob: Blob) => {
        try{
            const randomID = generateRandomUUid()
            await storeImageRecord({id: randomID, base_image: blob});
            setImage(randomID);
        }catch (err) {
            console.error(err);
        }
    }

    return {handleUpload, handleBlobUpload, handleUrlUpload}
}