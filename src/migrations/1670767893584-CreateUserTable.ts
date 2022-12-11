import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1670767893584 implements MigrationInterface {
  name = 'CreateUserTable1670767893584';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isConfirmed\` tinyint NOT NULL DEFAULT 0, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`middleName\` varchar(255) NULL DEFAULT '', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
