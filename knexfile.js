require('dotenv').config();

// module.exports = {
//   development: {
//     client: 'mysql',
//     connection: {
//       host: process.env.DB_HOST ,
//       user: process.env.DB_USER ,
//       password: process.env.DB_PASSWORD ,
//       database: process.env.DB_NAME,
//     },
//     migrations: {
//       directory: './migrations',
//     },
//     seeds: {
//       directory: './seeds',
//     },
//   },
//   production: {
//     client: 'mysql',
//     connection: {
//       connectionString: process.env.DATABASE_URL,
//       ssl: {
//         rejectUnauthorized: false,
//       },
//     },
//     migrations: {
//       directory: './migrations',
//     },
//     seeds: {
//       directory: './seeds',
//     },
//   },
// };




// TEMP for Melissa

require('dotenv').config()

module.exports = {
    client: "mysql",
    // version: '15.0',
    connection: {
        host:process.env.DB_HOST,
        port: process.env.PORT,
        user: process.env.DB_LOCAL_USER,
        password: process.env.DB_LOCAL_PASSWORD,
        database: process.env.DB_LOCAL_DBNAME,
        charset: "utf8"

    },
    // migrations: {
    //   directory: './migrations',
    // },
    // seeds: {
    //   directory: './seeds',
    // },
};

console.log(process.env.DB_LOCAL_USER)