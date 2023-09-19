const express = require('express');
const router = express.Router();
const supabasejs = require('@supabase/supabase-js');
const path = require('path');

const { supabaseUrl , supabaseKey } = require('./config');

const supabase = supabasejs.createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  })


router.use(express.static('public'));

router.use('/scripts', express.static(__dirname + '/node_modules/'));

router.get('/', (req, res) => {
    res.render('pages/index');
});

router.get('/index', (req, res) => {
    res.render('pages/index');
});

router.get('/history', (req, res) => {
  res.render('pages/history');
});

router.get('/historyjson', async (_, response) => {
    try {
      let result = await supabase
      .from('Reading')
      .select("*")
      .limit(10);
      response.send(result.data);
    } catch (error) {
      return response.send({ error });
    }
  });

router.get('/register', (req, res) => {
    res.render('pages/register');
});

router.get('/regression', (req, res) => {
    res.render('pages/regression');
});

router.get('/getcount', async (_, res) => {
    try {
      let result = await supabase
      .from('Reading')
      .select('*', { count: 'exact', head: true });
      res.send(result);
    } catch (error) {
        return res.send({ error });
    }
  });

router.get('/getjson', async (_, res) => {
    try {
      let result = await supabase
      .rpc('average');
      res.send(result);
    } catch (error) {
        return res.send({ error });
    }
  });

router.get('/showcount', (req, res) => {
    fetch('http://localhost:3000/getcount')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                res.send(data.count.toString());
            })
            .catch(error => res.send({ error }));
});

router.get('/showjson', (req, res) => {
    fetch('http://localhost:3000/getjson')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                res.send(data.data);
            })
            .catch(error => res.send({ error }));
});

module.exports = router;