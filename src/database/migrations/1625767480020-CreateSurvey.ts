import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurvey1625767480020 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

      await queryRunner.createTable(new Table({
        name: "surveys",
        columns:[
          {
            name:"id",
            type: "uuid",
            isPrimary:true,
            generationStrategy:"uuid",
            default:"uuid_generate_v4()"
          },
          {
            name: 'title',
            type:'varchar'
          },
          {
            name:'description',
            type:'varchar'
          },
          {
            name:'created_at',
            type: 'timestamp',
            default: 'now()'
          },
        ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('surveys');
    await queryRunner.query('DROP EXTENSION "uuid-ossp"')    
  }

}
