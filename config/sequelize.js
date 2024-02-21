const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    database: 'tugas_rest_API',
    host: 'localhost',
    username: 'root',
    password: 'root',
    dialect: 'mysql'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
    } catch (error) {
        console.error('unable to connect to database', error);
    }
})();

module.exports = sequelize;