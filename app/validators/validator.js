const { LinValidator, Rule } = require('../../core/lin-validator')

/**
 * 校验正整数
 * @class PositiveIntergerValidator
 * @extends {LinValidator}
 */
class PositiveIntergerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [new Rule('isInt', '需要是正整数', { min: 1 })]
  }
}

module.exports = {
  PositiveIntergerValidator
}