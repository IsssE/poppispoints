import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    Promise.all([
        knex.schema.table('variants', table => {
            table.string('league').notNullable().defaultTo("A");
        })
    ])
}


export async function down(knex: Knex): Promise<void> {
    Promise.all([
        knex.schema.table('variants', table => {
            table.dropColumn('league');
        })
    ])
}

