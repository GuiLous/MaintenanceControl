import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterNumEquipmentColumnToTombo1602684104113
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('equipments', 'numIdenfication');
    await queryRunner.addColumn(
      'equipments',
      new TableColumn({
        name: 'tombo',
        type: 'varchar',
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('equipments', 'tombo');

    await queryRunner.addColumn(
      'equipments',
      new TableColumn({
        name: 'numIdenfication',
        type: 'varchar',
        isUnique: true,
      }),
    );
  }
}
