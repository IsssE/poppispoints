import {login } from "./secrets"
module.exports = {
  development: {
    client: 'pg',
    //connection:'postgres://localhost/popoi',
    connection : {
      host : login.host,
      user : login.user,
      password : login.password,
      database : login.database
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  }
}
