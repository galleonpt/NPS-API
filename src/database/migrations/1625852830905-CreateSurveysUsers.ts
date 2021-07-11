import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveysUsers1625852830905 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(new Table({
      name: 'surveys_users',
      columns:[
        {
          name:"id",
          type: "uuid",
          isPrimary:true,
          generationStrategy:"uuid",
          default:"uuid_generate_v4()"
        },
        {
          name:"user_id",
          type:"uuid"
        },
        {
          name:"survey_id",
          type:"uuid"
        },
        {
          name:"value",
          type:"integer",
          isNullable:true
        }, 
        {
          name:'created_at',
          type: 'timestamp',
          default: 'now()'
        },
      ],
      foreignKeys:[
        {
          name:"FKUser",
          referencedTableName:'users',
          referencedColumnNames:['id'],
          columnNames:['user_id'],
          onDelete:'CASCADE',
          onUpdate:'CASCADE'
        },
        {
          name:"FKSurvey",
          referencedTableName:'surveys',
          referencedColumnNames:['id'],
          columnNames:['survey_id'],
          onDelete:'CASCADE',
          onUpdate:'CASCADE'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('surveys_userss');
    await queryRunner.query('DROP EXTENSION "uuid-ossp"')   
  }
}
