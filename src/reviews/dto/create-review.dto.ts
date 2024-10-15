import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsNotEmpty()
    @IsString()
    comment: string;
}