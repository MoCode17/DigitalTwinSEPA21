const fs = require('fs');
const { getClient } = require('./get-client');

(async () => {
  const client = await getClient();

  const sql = 'SELECT * FROM "Reading"';
  const values = ['1'];

  //const datetime = process.argv[2] ?? '2023-05-01 00:00:00';
  client.query(sql).then(res => {

    const data = res.rows;
    json = JSON.stringify(data);
    fs.writeFile('table.json', json, 'utf8', function (err) {
        if (err) {
          console.log('Error');
        } else{
          console.log('Created CSV with headers');
        }
      });
    }).finally(() => {

        client.end()
    });
})();