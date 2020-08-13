'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlansSchema extends Schema {
  up () {
    this.create('plans', (table) => {
      table.increments();
      table.string('type').notNullable();
      table.string('name').notNullable();
      table.decimal('price',8,2).notNullable();
      table.string('interval').defaultTo(null);
      table.decimal('capped_amount',8,2).defaultTo(null);
      table.string('terms').defaultTo(null);
      table.integer('trial_days').defaultTo(null);
      table.boolean('test').defaultTo(0);
      table.boolean('on_install').defaultTo(0);
      table.timestamps();
    })
  }

  down () {
    this.drop('plans')
  }
}

module.exports = PlansSchema
