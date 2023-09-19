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
  const entries = await client.query(sql);

  // Gets the header
  header = Object.keys(entries.rows?.[0]).join(',');

  // Gets the readings
  readings = entries.rows.map((r) => Object.values(r).join(',')).join('\n');

  // Join header and readings for CSV
  csv = header + "\n" + readings;

  // Outputs CSV
  fs.writeFile('table.csv', csv, 'utf8', function (err) {
    if (err) {
      console.log('Error');
    } else{
      console.log('Created CSV with headers');
    }
  });
  // End database connection
  await client.end();
})();
