const knexfile = require('../knexfile')
const knex = require('knex')(knexfile.development);
const Model = require('objection').Model;

class BaseModel extends Model {
  $beforeUpdate() {
    this.updated_at = knex.fn.now();
  }
}

module.exports = BaseModel;