/**
 * ===============================
 * @Project: SDWAN
 * @Author: Seth Gaurav
 * @belongs to: Infinity Labs
 * @License: ISC
 * ===============================
 */


module.exports = {
    port: process.env.PORT || 3000,
    
    db: {
      environment: process.env.ENV || 'prod',
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      options: {
        dialect: process.env.DIALECT || 'mysql',
        host: process.env.HOST || 'localhost',
        pool: {
          max: 100,
          min: 0,
          acquire: 20000,
          idle: 20000,
        },
        logging: false,
        port: '3306',
        freezeTableName: true,
        define: {
          charset: 'utf8',
          collate: 'utf8_general_ci',
          timestamps: true
        }
      }
    },
    authentication: {
      jwtSecret: process.env.JWT_SECRET,
      googleKey: process.env.GOOGLE_KEY
    }
  }
  