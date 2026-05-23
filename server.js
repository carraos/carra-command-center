require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const { createClient } =
require('@supabase/supabase-js');

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// SERVE FRONTEND FILES
// ==========================================

app.use(express.static(__dirname));

// ==========================================
// SUPABASE CONNECTION
// ==========================================

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ==========================================
// HOME ROUTE
// ==========================================

app.get('/', (req, res) => {

  res.sendFile(
    path.join(__dirname, 'index.html')
  );

});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get('/health', (req, res) => {

  res.json({
    ok: true,
    service: 'carra-command-center',
    version: '2.0.0',
    status: 'LIVE',
    timestamp: new Date().toISOString()
  });

});

// ==========================================
// GET TASKS
// ==========================================

app.get('/tasks', async (req, res) => {

  try{

    const { data, error } =
    await supabase
      .from('tasks')
      .select('*')
      .order('created_at', {
        ascending:false
      });

    if(error){

      return res.status(400).json({
        ok:false,
        error:error.message
      });

    }

    res.json({
      ok:true,
      count:data.length,
      data
    });

  }catch(err){

    res.status(500).json({
      ok:false,
      error:err.message
    });

  }

});

// ==========================================
// CREATE TASK
// ==========================================

app.post('/tasks', async (req, res) => {

  try{

    const { data, error } =
    await supabase
      .from('tasks')
      .insert([req.body])
      .select();

    if(error){

      return res.status(400).json({
        ok:false,
        error:error.message
      });

    }

    res.json({
      ok:true,
      message:'Task created',
      data
    });

  }catch(err){

    res.status(500).json({
      ok:false,
      error:err.message
    });

  }

});

// ==========================================
// UPDATE TASK
// ==========================================

app.put('/tasks/:id', async (req, res) => {

  try{

    const { data, error } =
    await supabase
      .from('tasks')
      .update(req.body)
      .eq('id', req.params.id)
      .select();

    if(error){

      return res.status(400).json({
        ok:false,
        error:error.message
      });

    }

    res.json({
      ok:true,
      message:'Task updated',
      data
    });

  }catch(err){

    res.status(500).json({
      ok:false,
      error:err.message
    });

  }

});

// ==========================================
// DELETE TASK
// ==========================================

app.delete('/tasks/:id', async (req, res) => {

  try{

    const { error } =
    await supabase
      .from('tasks')
      .delete()
      .eq('id', req.params.id);

    if(error){

      return res.status(400).json({
        ok:false,
        error:error.message
      });

    }

    res.json({
      ok:true,
      message:'Task deleted'
    });

  }catch(err){

    res.status(500).json({
      ok:false,
      error:err.message
    });

  }

});

// ==========================================
// SERVER START
// ==========================================

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`
====================================
🚀 CARRA Command Center Running
🌐 Port: ${PORT}
====================================
  `);

});