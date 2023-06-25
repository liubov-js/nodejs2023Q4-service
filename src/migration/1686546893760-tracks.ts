import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Tracks1686546893760 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tracks',
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
            name: 'artistId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'albumId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'duration',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tracks');
  }
}
