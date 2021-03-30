import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterRoomColumnDropNumRom1602771327781
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('rooms', 'numRoom');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'rooms',
      new TableColumn({
        name: 'numRoom',
        type: 'integer',
        isNullable: true,
      }),
    );
  }
}
