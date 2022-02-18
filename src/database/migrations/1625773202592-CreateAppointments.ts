import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1625773202592
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'code',
            type: 'varchar',
          },
          {
            name: 'contract_id',
            type: 'int',
          },
          {
            name: 'module',
            type: 'varchar',
          },
          {
            name: 'client_id',
            type: 'int',
          },
          {
            name: 'date',
            type: 'datetime',
          },
          {
            name: 'commodity_types_id',
            type: 'int',
          },
          {
            name: 'amount',
            type: 'double',
          },
          {
            name: 'team_id',
            type: 'int',
          },
          {
            name: 'doc_bl',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'doc_di',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'doc_container',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'obs',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status_id',
            type: 'int',
          },
          {
            name: 'grid_index',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
