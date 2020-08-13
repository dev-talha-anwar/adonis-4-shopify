'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {

  static boot () {
    super.boot()
    this.addTrait('SoftDelete')
  }

  static get hidden () {
    return ['password']
  }
}

module.exports = User
