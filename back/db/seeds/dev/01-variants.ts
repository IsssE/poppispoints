import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("variants").del();

    // Inserts seed entries
    await knex("variants").insert([
        { name: "Henkkari",  description: "TBD", league: "A" },
        { name: "Viisiottelu",  description: "TBD", league: "A" },
        { name: "Seitsenottelu",  description: "TBD", league: "A" },
        { name: "Joukkuekenttä-yksin",  description: "TBD", league: "A" },
        { name: "Pystyhydra",  description: "TBD", league: "A" },
        { name: "Smuulin sviippitreeni",  description: "TBD", league: "A" },
        { name: "Paripeli",  description: "TBD", league: "A" },
        { name: "Joukkuepeli",  description: "TBD", league: "A",  }
    ]);
};
