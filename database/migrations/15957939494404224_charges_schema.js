'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChargesSchema extends Schema {
  up () {
    this.create('charges', (table) => {
      table.increments();
      table.bigInteger('charge_id').notNullable();
      table.boolean('test').defaultTo(0);
      table.string('status').defaultTo(null);
      table.string('name').defaultTo(null);
      table.string('terms').defaultTo(null);
      table.string('type').notNullable();
      table.decimal('price',8,2).notNullable();
      table.string('interval').defaultTo(null);
      table.decimal('capped_amount',8,2).defaultTo(null);
      table.integer('trial_days').defaultTo(null);
      table.timestamp('biling_on').nullable();
      table.timestamp('activated_on').nullable();
      table.timestamp('trial_ends_on').nullable();
      table.timestamp('cancelled_on').nullable();
      table.timestamp('expires_on').nullable();
      table.integer('plan_id').unsigned().nullable().references('id').inTable('plans');
      table.string('description').defaultTo(null);
      table.bigInteger('reference_charge').defaultTo(null);
      table.timestamps();
      table.timestamp('deleted_at').nullable();
      table.integer('user_id').unsigned().nullable().references('id').inTable('users');
    })
  }

  down () {
    this.drop('charges')
  }
}

module.exports = ChargesSchema
