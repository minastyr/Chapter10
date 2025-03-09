import express from 'express';
import { connectToDb } from '../db/connection.js';
import routes from '../index.js';
//import { routes } from '../index.js';
await connectToDb();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});