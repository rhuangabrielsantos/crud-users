import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name')
      table.string('username')
      table.string('password')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.date('created_at')
      table.date('updated_at')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
