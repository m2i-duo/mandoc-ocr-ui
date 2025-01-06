import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {v4} from "uuid"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const createPdfFile = async (text: string): Promise<Blob> => {
    const { PDFDocument, rgb } = await import('pdf-lib')
    const fontkit = (await import('@pdf-lib/fontkit')).default
    const fontBytes = await fetch('/assets/fonts/deco-type-thuluth.ttf').then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.create()
    pdfDoc.registerFontkit(fontkit)

    const customFont = await pdfDoc.embedFont(fontBytes)
    const page = pdfDoc.addPage([600, 800])
    const textSize = 20

    page.drawText(text, {
        x: 50,
        y: 750,
        size: textSize,
        font: customFont,
        color: rgb(0, 0, 0),
        maxWidth: 500,
        lineHeight: textSize * 1.5,
    })

    const pdfBytes = await pdfDoc.save()
    return new Blob([pdfBytes], { type: 'application/pdf' })
};

export const createDocxFile = async (text: string) => {
    return new Blob([text], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
}

export const createTxtFile = async (text: string) => {
    return new Blob([text], { type: 'text/plain' })
}

export function downloadFile(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
}

export const generateRandomUUid = () => {
    return v4()
}

export const convertBlobToBase64 = async(blob: Blob) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            resolve(reader.result as string)
        }
        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}

export const convertBase64ToBlob = async (base64: string): Promise<Blob> => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/jpeg' });
};

export const convertBlobToFile = async(blob: Blob, filename: string) => {
    return new File([blob], filename)
}
