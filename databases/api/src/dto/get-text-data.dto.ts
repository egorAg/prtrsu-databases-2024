import { ApiProperty } from '@nestjs/swagger';

export class GetTextData {
  @ApiProperty({
    example: 'user1',
    enum: ['user1', 'user2', 'user3', 'user4', 'user5'],
  })
  usename: string;
}
