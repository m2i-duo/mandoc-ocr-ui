import {ReactNode} from "react";
import {taggedWordSchema} from "@/lib/schema";
import {z} from "zod";

export type Theme = "light" | "dark";
export type Locale = "ar" | "fr" | "en";
export type Model = 'CRNN' | 'TESSERACT'
export type RenderMode = "MERGED" | "SPLIT";
export type SaveFormat = "pdf" | "docx" | "txt";
export type DownloadItem = {
    icon: ReactNode;
    name: string;
    description: string;
    format: SaveFormat;
}
export type ModelDetails = {
    name: string;
    description: string;
    version: string;
}

export type RenderModeDetails = {
    name: string;
    value: RenderMode;
    description: string;
}

export type TFont = {
    fontFace: string;
    src: string;
    variable: string;
    weight?: string;
}
export interface ImageRecord {
    id: string;
    base_image: Blob;
}