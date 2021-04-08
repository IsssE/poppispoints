
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    Promise.all([
        knex.schema.createTable('players', (table) => {
            table.increments('id');
            table.string('username').notNullable();
        }),
        knex.schema.createTable('results', (table) => {
            table.increments('id');
            table.string('location').notNullable();
            table.date('time').notNullable();
            table.integer('score').notNullable();
            table.string('proof').notNullable();
            table.integer('variant_id').notNullable();
        }),
        knex.schema.createTable('players_results', (table) => {
            table.integer('player_id').references('players.id');
            table.integer('result_id').references('results.id');
            table.unique(['player_id', 'result_id'])
        }),
        knex.schema.createTable('variants',(table) => {
            table.increments('id');
            table.string('name').notNullable();
            table.string('description').notNullable();
        })

    ])
};


export async function down(knex: Knex): Promise<void> {
    Promise.all([
        knex.schema.dropTable('players'),
        knex.schema.dropTable('results'),
        knex.schema.dropTable('players_results'),
        knex.schema.dropTable('variants')
    ])
}

