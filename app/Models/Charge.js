'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Charge extends Model {
    static boot () {
        super.boot()
        this.addTrait('SoftDelete')
    }
}

module.exports = Charge
