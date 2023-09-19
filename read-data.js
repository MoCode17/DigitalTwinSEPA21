const { getClient } = require('./get-client');

(async () => {
  const client = await getClient();

  const datetime = process.argv[2] ?? '2023-05-01 00:00:00';
  const entries = await client.query('SELECT * FROM "Reading" WHERE date_trunc(\'hour\', reading_time) = $1;', [datetime]);
  console.log(`Database entries for ${datetime}: ${entries.rowCount} row(s)`);
  console.log(Object.keys(entries.rows?.[0]).join('\t'));
  console.log(`${entries.rows.map((r) => Object.values(r).join('\t')).join('\n')}`);
  await client.end();
})();