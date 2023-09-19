// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY
};

