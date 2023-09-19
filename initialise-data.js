const fs = require('fs');
const supabasejs = require('@supabase/supabase-js');

const { supabaseUrl , supabaseKey } = require('./config');

const supabase = supabasejs.createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
})

var csv = [];

async function initialiseData() {
    try {
      let result1 = await supabase
      .from('Reading')
      .select("*")
      .csv()
      .range(0, 999);
      csv = result1.data;
      fs.writeFile('data.csv', csv, 'utf8', function (err) {
        if (err) {
          console.log('Error');
        } else{
          console.log('Exported CSV');
        }
      });

      let result2 = await supabase
      .from('Reading')
      .select("*")
      .csv()
      .range(1000, 1999);
      csv = result2.data;
      fs.appendFileSync('data.csv', csv);

      let result3 = await supabase
      .from('Reading')
      .select("*")
      .csv()
      .range(2000, 2999);
      csv = result3.data;
      fs.appendFileSync('data.csv', csv);

      let result4 = await supabase
      .from('Reading')
      .select("*")
      .csv()
      .range(3000, 3999);
      csv = result4.data;
      fs.appendFileSync('data.csv', csv);

      let result5 = await supabase
      .from('Reading')
      .select("*")
      .csv()
      .range(4000, 4999);
      csv = result5.data;
      fs.appendFileSync('data.csv', csv);

      let result6 = await supabase
      .from('Reading')
      .select("*")
      .csv()
      .range(5000, 5999);
      csv = result6.data;
      fs.appendFileSync('data.csv', csv);      
      
      let result7 = await supabase
      .from('Reading')
      .select("*")
      .csv()
      .range(6000, 6999);
      csv = result7.data;
      fs.appendFileSync('data.csv', csv);

    } catch (error) {
      console.log(error);
    }
};

initialiseData();