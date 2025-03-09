import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

/* console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
 */

const pool = new Pool({
	user: 'postgres',
	password: 'Password1!',
	host: 'localhost',
	database: 'hr',
	port: 5432
});

const connectToDb = async () => {
	try {
		await pool.connect();
		console.log('Connected to the database.');
	} catch (err) {
		console.error('Error connecting to database:', err);
		process.exit(1);
	}
};

export { pool, connectToDb };
