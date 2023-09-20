import { CreateChargeDto } from '@app/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsDate, IsDefined, ValidateNested } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
