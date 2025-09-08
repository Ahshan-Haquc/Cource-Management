const app = require('./src/app');
const databaseConnection = require('./src/config/db');
require('dotenv').config();


const PORT = process.env.PORT || 5000;


databaseConnection()
.then(() => {
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
console.error('Failed to connect to mongodb atlas', err);
process.exit(1);
});