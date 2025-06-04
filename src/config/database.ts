import { Sequelize } from 'sequelize';
import { config } from './env';

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_NAME,
    username: config.DB_USER,
    password: config.DB_PASS,
    logging: config.NODE_ENV === 'development',
});

// Initialize models
export const initializeModels = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('🗄️  Database connected and synchronized');
    } catch (error) {
        console.error('❌ Database connection error:', error);
        throw error;
    }
};

export { sequelize }; 