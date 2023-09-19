// Required to output a file
const fs = require('fs');
// Required to establish connection
const { getClient } = require('./get-client');

(async () => {
    // Gets the database connection client
    const client = await getClient();

    // The SQL query to execute
    const sql = 'SELECT * FROM "Reading"';

    // Executes SQL statement
    client.query(sql).then(res => {
        // Set data to be rows from response
        const data = res.rows;

        // Convert the JSON to string format
        json_str = JSON.stringify(data);

        // Writes the JSON to a file
        fs.writeFile('table.json', json_str, 'utf8', function (err) {
            if (err) {
                console.log('Error');
            } else{
                console.log('Created CSV with headers');
            }
        });
    }).finally(() => {
        // End database connection
        client.end()
    });
})();