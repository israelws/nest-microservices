import { IsCreditCard, IsNumber } from 'class-validator';

export class CardDto {
  @IsCreditCard()
  number: string;

  @IsNumber()
  exp_month: number;

  @IsNumber()
  exp_year: number;

  @IsNumber()
  cvc: string;
}
