import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1597415411458 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'login',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'contract_id',
            type: 'int',
          },
          {
            name: 'spawn_module',
            type: 'boolean',
          },
          {
            name: 'loading_module',
            type: 'boolean',
          },
          {
            name: 'inventory_module',
            type: 'boolean',
          },
          {
            name: 'painel_adm',
            type: 'boolean',
          },
          {
            name: 'checker',
            type: 'boolean',
          },
          {
            name: 'concierge',
            type: 'boolean',
          },
          {
            name: 'supervisor',
            type: 'boolean',
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
    await queryRunner.dropTable('users');
  }
}
