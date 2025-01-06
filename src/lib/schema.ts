import {z} from 'zod'

export const inputImageSchema = z.object({
    image: z.object({})
})

export const mergedOutputSchema  = z.object({
    text: z.string()
})
export const splitChunkOutputSchema = z.object({
    image: z.string(),
    label: z.string()
})
export const splitOutputSchema = z.array(splitChunkOutputSchema)

export const urlSchema = z.string().url()

export type InputImage = {
    image: File
}
export type MergedOutput = z.infer<typeof mergedOutputSchema>
export type SplitChunkOutput = z.infer<typeof splitChunkOutputSchema>
export type SplitOutput = z.infer<typeof splitOutputSchema>
export type TUrl = z.infer<typeof urlSchema>