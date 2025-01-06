import {InputImage, MergedOutput, mergedOutputSchema, SplitOutput, splitOutputSchema} from "@/lib/schema";
import {MandocMergedResponse, MandocRequestDTO, mandocRequestSchema, MandocSplitResponse} from "@/lib/mandoc-api-dtos";

export class MandocDtoMapper {
  public mapRequestDto(req: InputImage): MandocRequestDTO | null {
    const obj: MandocRequestDTO = {
      image: req.image
    };
    const parsedRequest = mandocRequestSchema.safeParse(obj);
    return parsedRequest.success ? obj : null;
  }

  public mapMergedResponseDto(response: MandocMergedResponse): MergedOutput | null {
    const obj: MergedOutput = {
      text: response.text
    };
    const parsedResponse = mergedOutputSchema.safeParse(obj);
    return parsedResponse.success ? parsedResponse.data : null;
  }

  public mapSplitResponseDto(response: MandocSplitResponse): SplitOutput | null {
    const obj: SplitOutput = [...response]
    const parsedResponse = splitOutputSchema.safeParse(obj);
    return parsedResponse.success ? parsedResponse.data : null
  }
}