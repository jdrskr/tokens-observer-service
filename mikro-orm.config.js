module.exports = {
  entities: ['./dist/domain/*/model/*.js'],
  dbName: 'tokens-observer-service',
  migrations: {
    path: './src/persistance/migrations',
  },
  type: 'postgresql',

  port: 5432,
  user: 'postgres',
  password: 'postgres',
};
