import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class createForeignKeyMaintenance1602599018444
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'maintenances',
      new TableForeignKey({
        name: 'MaintenanceEquipment',
        columnNames: ['equipment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'equipments',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('maintenances', 'MaintenanceEquipment');
  }
}
