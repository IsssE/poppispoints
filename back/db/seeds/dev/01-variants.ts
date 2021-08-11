import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("variants").del();

    // Inserts seed entries
    await knex("variants").insert([
        { name: "Henkkari",  description: "TBD", league: "A", ascending: false },
        { name: "Viisiottelu",  description: "TBD", league: "A", ascending: false },
        { name: "Seitsenottelu",  description: "TBD", league: "A", ascending: false },
        { name: "Joukkuekenttä yksin",  description: "TBD", league: "A", ascending: false },
        { name: "Pystyhydra",  description: "TBD", league: "A", ascending: true },
        { name: "Smuulin sviippitreeni",  description: "TBD", league: "A", ascending: false },
        { name: "Paripeli",  description: "TBD", league: "A", ascending: false },
        { name: "Joukkuepeli",  description: "TBD", league: "A", ascending: false }
    ]);
};
