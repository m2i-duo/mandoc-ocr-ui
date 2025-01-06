import {API_URL} from "@/lib/constants";
import {Model, RenderMode} from "@/lib/types";

const BASE_URL = API_URL
export interface MandocApiEndpoints {
    models: (model: Model) => {
        mode: (mode: RenderMode) => {
            analyze: string
        }
    }
}

export const MANDOCAPI_ENDPOINTS: MandocApiEndpoints = {
    models: (model) => {
        let modelName = "hmm"
        switch (model) {
            case "CRNN":
                modelName = "crnn"
                break
            case "TESSERACT":
                modelName = "tesseract"
                break
            default:
                modelName = "hmm"
                break
        }
        return {
            mode: (mode) => {
                let modeName = "merged"
                switch (mode) {
                    case "MERGED":
                        modeName = "merged"
                        break
                    case "SPLIT":
                        modeName = "chunks"
                        break
                    default:
                        modeName = "merged"
                        break
                }
                return {
                    analyze: `${BASE_URL}/${modelName}/${modeName}`
                }
            }
        }
    },
}