import { z } from 'zod';

export const mandocRequestSchema = z.object({
    image: z.object({})
})

export type MandocRequestDTO = {
    image: File
}

export const mandocMergedResponseDtoSchema = z.object({
    text: z.string(),
})
export const mandocSplitChunkResponseDtoSchema = z.object({
    image: z.string(),
    label: z.string()
})
export const mandocSplitResponseDtoSchema = z.array(mandocSplitChunkResponseDtoSchema)
export type MandocMergedResponse = z.infer<typeof mandocMergedResponseDtoSchema>
export type MandocSplitChunkResponse = z.infer<typeof mandocSplitChunkResponseDtoSchema>
export type MandocSplitResponse = z.infer<typeof mandocSplitResponseDtoSchema>