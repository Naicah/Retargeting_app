const BaseModel = require('./BaseModel');

class getTableName extends BaseModel {
  constructor() {
    super();
  }

  static get tableName() {
    return 'ads';
  }
}

module.exports = getTableName;
