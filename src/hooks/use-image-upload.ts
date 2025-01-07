"use client"

import {ChangeEvent, useState} from "react";
import {generateRandomUUid} from "@/lib/utils";
import {storeImageRecord} from "@/lib/indexedDB";
import {useMandocContext} from "@/context/mandoc-ocr-context";

export const useImageUpload = () => {
    const {setImage} = useMandocContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<boolean>(false);

    const calculateProgress = (loaded: number, total: number) => {
        return Math.round((loaded / total) * 100);
    }

    const resetState = () => {
        setLoading(false);
        setProgress(0);
        setError(false);
    }

    const handleUpload = async(e: ChangeEvent<HTMLInputElement>) => {
        try {
            resetState();
            const file = e.target.files?.[0];
            if (!file) return;
            setLoading(true);

            const randomID = generateRandomUUid();
            const imageBlob = new Blob([file], {type: file?.type});
            await storeImageRecord({id: randomID, base_image: imageBlob});
            setImage(randomID);

            setProgress(100);
        } catch (err) {
            setError(true);
            console.error(err);
        }
        setLoading(false);
    }

    const handleUrlUpload = async (url: string) => {
        try {
            resetState();
            setLoading(true);

            const randomID = generateRandomUUid();
            const response = await fetch(`${url}`);
            const reader = response.body?.getReader();
            const contentLength = +response.headers.get('Content-Length')!;
            let loaded = 0;
            const chunks: Uint8Array[] = [];

            if (reader) {
                while (true) {
                    const {done, value} = await reader.read();
                    if (done) break;
                    if (value) {
                        chunks.push(value);
                        loaded += value.length;
                        setProgress(calculateProgress(loaded, contentLength));
                    }
                }
            }

            const blob = new Blob(chunks);
            await storeImageRecord({id: randomID, base_image: blob});
            setImage(randomID);

            setProgress(100);
            setLoading(false);
        } catch (err) {
            setError(true);
            console.error(err);
        }
    }

    const handleBlobUpload = async (blob: Blob) => {
        try {
            resetState();
            setLoading(true);

            const randomID = generateRandomUUid();
            await storeImageRecord({id: randomID, base_image: blob});
            setImage(randomID);

            setProgress(100);

        } catch (err) {
            setError(true);
            console.error(err);
        }
        setLoading(false);
    }

    return {handleUpload, handleBlobUpload, handleUrlUpload, state: {loading, progress, error}}
}