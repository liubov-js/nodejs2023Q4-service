import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Artists1686500447658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'artists',
        columns: [
          {
            name: 'id',
            type: 'UUID',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'grammy',
            type: 'boolean',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('artists');
  }
}
