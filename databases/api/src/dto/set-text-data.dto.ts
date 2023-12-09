import { ApiProperty } from '@nestjs/swagger';

export class SetTextData {
  @ApiProperty({
    example: 'user1',
    enum: ['user1', 'user2', 'user3', 'user4', 'user5'],
    required: true,
  })
  user: string;

  @ApiProperty({
    properties: {
      text: {
        properties: {
          name: {
            example: 'helvetica',
            enum: ['helvetica', 'new_york', 'source_code'],
            description:
              'название шрифта, а там дальше ориентинуйся как хочешь',
          },
          size: {
            example: 16,
            minimum: 1,
            maximum: 512,
            description: 'Размер шрифта',
          },
          color: {
            example: '#da00e2',
            description: 'Цвет шрифта в HEX',
          },
          lettering: {
            example: 'semi-bold',
            description:
              'Костя, честно, мне поебать что будет сюда ложиться, окей? Просто используй на свое усмотрение',
          },
        },
      },
    },
  })
  text: {
    name: string;
    size: number;
    color: string;
    lettering: string;
  };
}
