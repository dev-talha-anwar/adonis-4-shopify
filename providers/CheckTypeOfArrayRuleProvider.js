const { ServiceProvider } = require('@adonisjs/fold')


class CheckTypeOfArrayRuleProvider extends ServiceProvider {
  async checkFn (data, field, message, args, get) {
  	const type = args[0]
	const value = get(data, field)
    if (!value) {
      return
    }
    if(!Array.isArray(value)){
      throw message
    }
    for(var i=0;i<value.length;i++){
      if(typeof(value[i]) !== type){
        throw message
      }
    }
  }
  boot () {
    const Validator = use('Validator')
    Validator.extend('checkArrayValues', this.checkFn.bind(this))
  }
}

module.exports = CheckTypeOfArrayRuleProvider