import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjectTables1670786797513 implements MigrationInterface {
  name = 'CreateProjectTables1670786797513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`take_aways\` (\`id\` int NOT NULL AUTO_INCREMENT, \`caption\` varchar(255) NOT NULL, \`projectId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` longtext NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`caption\` text NULL, \`projectId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `ALTER TABLE \`take_aways\` ADD CONSTRAINT \`FK_d9596bbc02450825a8fc998bb47\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`images\` ADD CONSTRAINT \`FK_1dde96f9791cf7efa86596d85f7\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_1dde96f9791cf7efa86596d85f7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`take_aways\` DROP FOREIGN KEY \`FK_d9596bbc02450825a8fc998bb47\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );

    await queryRunner.query(`DROP TABLE \`images\``);
    await queryRunner.query(`DROP TABLE \`projects\``);
    await queryRunner.query(`DROP TABLE \`take_aways\``);
  }
}
