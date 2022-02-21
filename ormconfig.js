console.log(process.env.MONGODB_URL)
module.exports = [
  {
    name: 'default',
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [`./${process.env.NODE_ENV === 'dev' ? 'src' : 'dist'}/models/entities/*.${process.env.NODE_ENV === 'dev' ? 'ts' : 'js'}`],
    migrations: [`./${process.env.NODE_ENV === 'dev' ? 'src' : 'dist'}/database/migrations/*.${process.env.NODE_ENV === 'dev' ? 'ts' : 'js'}`],
    cli: {
        migrationsDir: './src/database/migrations',
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    url: process.env.MONGODB_URL,
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    useUnifiedTopology: true,
    entities: [`./${process.env.NODE_ENV === 'dev' ? 'src' : 'dist'}/models/schemas/*.${process.env.NODE_ENV === 'dev' ? 'ts' : 'js'}`],
  },
];
