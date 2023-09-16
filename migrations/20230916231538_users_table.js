/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.uuid('user_id').primary();
        table.string('password').notNullable();
        table.string('email_address').notNullable();
        table.string('phone_number').notNullable();
        table.date('birthdate').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('address_1').notNullable();
        table.string('address_2').notNullable();
        table.string('postalcode').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('country').notNullable();
        table.timestamp('created_on').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_on').defaultTo(knex.fn.now()).notNullable();
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
