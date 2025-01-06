import {Locale, Model, ModelDetails, RenderMode, RenderModeDetails, TFont} from "@/lib/types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"
export const APP_LOCALES : Locale[] = ["ar", "fr", "en"]
export const DB_NAME = 'imageStore';
export const STORE_NAME = 'images';
export const LOGO = {
    src: {
        light: "/assets/images/logo/logo-full-light.png",
        dark: "/assets/images/logo/logo-full-dark.png",
    },
    alt: "mandoc-ocr",
    width: 40,
    height: 40,
}

export const MODELS: Record<Model, ModelDetails> = {
   "CRNN" : {
        name: "CRNN Model",
        description: "Convolutional Recurrent Neural Network with Connectionist Temporal Classification",
        version: "1.0.0",
    },
    "TESSERACT": {
        name: "Tesseract",
        description: "A ready-to-use OCR model",
        version: "1.0.0",
    }
}

export const RENDER_MODES: RenderModeDetails[] = [
    {
        name: "Merged",
        value: "MERGED",
        description: "Merge the output of all chunks in one text"
    },
    {
        name: "Split",
        value: "SPLIT",
        description: "Renders each chunk separately with its output [image, text]"
    }
]

export const FONTS : TFont[] = [
    {
        fontFace: "Aref Ruqaa",
        src: "/assets/fonts/Aref_Menna-Bold.ttf",
        variable: "--font-aref-menna",
        weight: "100 200 300 400 500 600 700 800 900",
    },
    {
        fontFace: "Ae_Nice",
        src: "/assets/fonts/ae_Nice.ttf",
        variable: "--font-ae-nice",
        weight: "100 200 300 400 500 600 700 800 900",
    },
    {
        fontFace: "Decotype thuluth",
        src: "/assets/fonts/deco-type-thuluth.ttf",
        variable: "--font-deco-type-thuluth",
        weight: "100 200 300 400 500 600 700 800 900",
    },
    {
        fontFace: "Al Bakkah Bold",
        src: "/assets/fonts/al-bakkah-bold.ttf",
        variable: "--font-al-bakkah-bold",
        weight: "100 200 300 400 500 600 700 800 900",
    },
    {
        fontFace: "Setareh Bold",
        src: "/assets/fonts/B-Setareh-Bold.ttf",
        variable: "--font-bsetareh-bold",
        weight: "100 200 300 400 500 600 700 800 900",
    },
    {
        fontFace: "Badr",
        src: "/assets/fonts/badr.ttf",
        variable: "--font-badr",
        weight: "100 200 300 400 500 600 700 800 900",
    },
    {
        fontFace: "Basem Mareh",
        src: "/assets/fonts/basem-mareh.ttf",
        variable: "--basem-mareh",
        weight: "100 200 300 400 500 600 700 800 900",
    },
    {
        fontFace: "Ghalam 1",
        src: "/assets/fonts/ghalam-1.otf",
        variable: "--ghalam-1",
        weight: "100 200 300 400 500 600 700 800 900",
    },
    {
        fontFace: "Ghalam 2",
        src: "/assets/fonts/ghalam-2.otf",
        variable: "--ghalam-2",
        weight: "100 200 300 400 500 600 700 800 900",
    },
    {
        fontFace: "Kamran",
        src: "/assets/fonts/kamran.ttf",
        variable: "--kamran",
        weight: "100 200 300 400 500 600 700 800 900",
    },
    {
        fontFace: "Phalls Khodkar",
        src: "/assets/fonts/phalls-khodkar.ttf",
        variable: "--phalls-khodkar",
        weight: "100 200 300 400 500 600 700 800 900",
    },
    {
        fontFace: "Tabassom",
        src: "/assets/fonts/tabassom.ttf",
        variable: "--tabassom",
        weight: "100 200 300 400 500 600 700 800 900",
    },
    {
        fontFace: "Tharwat Emara",
        src: "/assets/fonts/TEHAFS2TharwatEmara.ttf",
        variable: "--TEHAFS2TharwatEmara",
        weight: "100 200 300 400 500 600 700 800 900",
    },
    {
        fontFace: "Toyor Aljanah Regular",
        src: "/assets/fonts/toyorAljanah-Regular-2.otf",
        variable: "--toyorAljanah-Regular-2",
        weight: "100 200 300 400 500 600 700 800 900",
    },
    {
        fontFace: "Ziba",
        src: "/assets/fonts/ziba.ttf",
        variable: "--ziba",
        weight: "100 200 300 400 500 600 700 800 900",
    },
]