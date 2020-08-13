'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments();
      table.string('name', 80).notNullable().unique();
      table.string('email', 254).nullable();
      table.datetime('email_verified_at').nullable().defaultTo(null);
      table.string('password', 254).nullable();
      table.boolean('grandfathered').defaultTo(false);
      table.boolean('freemium').defaultTo(false);
      table.integer('plan_id').unsigned().nullable().references('id').inTable('plans');
      table.timestamps();
      table.timestamp('deleted_at').nullable();
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
