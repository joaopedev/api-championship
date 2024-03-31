import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1711849892835 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        CREATE TABLE public.user (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255),
            username VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(8) NOT NULL,
            cpf VARCHAR(11) NOT NULL,
            sex VARCHAR(20) NOT NULL,
            birth DATE,
            token INTEGER NOT NULL,
            created-at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated-at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            token_updated INTEGER NOT NULL
        );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.user
        `)
    }

}
