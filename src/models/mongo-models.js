/**
 * Creates a new Model
 * @class Model
 */
class Model {
    /**
     * @param {Object} schema 
     */
  constructor (schema) {
      this.schema = schema;
  }

  /**
   * Create
   * @param {*} record
   * @returns
   * @memberof Model
   */
  create (record) {
      const newRecord = new this.schema(record);
      return newRecord.save();
  }

  /**
   * Read
   * @param {*} id
   * @returns Query
   * @memberof Model
   */
  read (id) {
      const queryObject = id ? { _id: id } : {};
      return this.schema.find(queryObject);
  }

  /**
   * Update
   * @param {*} id
   * @param {*} record
   * @returns Query
   * @memberof Model
   */
  update (id, record) {
      return this.schema.findByIdAndUpdate(id, record, { new: true });
  }

  /**
   * Delete
   * @param {*} id
   * @returns Query
   * @memberof Model
   */
  delete (id) {
      return this.schema.findByIdAndDelete(id);
  }

}

module.exports = Model;