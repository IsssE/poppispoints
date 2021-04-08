
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    Promise.all([
        knex.schema.createTableIfNotExists('players', (table) => {
            table.increments('id');
            table.string('username');
            table.integer('result_id');
        }),
        knex.schema.createTableIfNotExists('results', (table) => {
            table.increments('id');
            table.string('location');
            table.date('time');
            table.integer('score');
            table.string('proof');
            table.integer('variant_id');
        }),
        knex.schema.createTableIfNotExists('players_results', (table) => {
            table.integer('player_id').references('players.result_id');
            table.integer('result_id').references('results.id');
            table.unique(['player_id', 'result_id'])
        }),
        knex.schema.createTableIfNotExists('variants',(table) => {
            table.increments('id');
            table.string('name');
            table.string('description')
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

