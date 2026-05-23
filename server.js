require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

app.use(cors());
app.use(express.json());

// ========================================
// SUPABASE CONNECTION
// ========================================
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ========================================
// HEALTH CHECK ROUTE
// ========================================
app.get('/health', (req, res) => {

  res.json({
    ok: true,
    service: 'carra-command-center',
    version: '2.0.0',
    env: 'development',
    timestamp: new Date().toISOString()
  });

});

// ========================================
// CREATE TASK ROUTE
// ========================================
app.post('/tasks', async (req, res) => {

  try {

    console.log('Incoming Task:', req.body);

    const { data, error } = await supabase
      .from('tasks')
      .insert([req.body])
      .select();

    if (error) {

      return res.status(400).json({
        ok: false,
        error: error.message
      });

    }

    res.json({
      ok: true,
      message: 'Task created successfully',
      data
    });

  } catch (err) {

    res.status(500).json({
      ok: false,
      error: err.message
    });

  }

});

// ========================================
// GET ALL TASKS ROUTE
// ========================================
app.get('/tasks', async (req, res) => {

  try {

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {

      return res.status(400).json({
        ok: false,
        error: error.message
      });

    }

    res.json({
      ok: true,
      count: data.length,
      data
    });

  } catch (err) {

    res.status(500).json({
      ok: false,
      error: err.message
    });

  }

});

// ========================================
// UPDATE TASK ROUTE
// ========================================
app.put('/tasks/:id', async (req, res) => {

  try {

    const { data, error } = await supabase
      .from('tasks')
      .update(req.body)
      .eq('id', req.params.id)
      .select();

    if (error) {

      return res.status(400).json({
        ok: false,
        error: error.message
      });

    }

    res.json({
      ok: true,
      message: 'Task updated successfully',
      data
    });

  } catch (err) {

    res.status(500).json({
      ok: false,
      error: err.message
    });

  }

});

// ========================================
// DELETE TASK ROUTE
// ========================================
app.delete('/tasks/:id', async (req, res) => {

  try {

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', req.params.id);

    if (error) {

      return res.status(400).json({
        ok: false,
        error: error.message
      });

    }

    res.json({
      ok: true,
      message: 'Task deleted successfully'
    });

  } catch (err) {

    res.status(500).json({
      ok: false,
      error: err.message
    });

  }

});

// ========================================
// SERVER START
// ========================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`
========================================
🚀 CARRA Command Center Running
🌐 Port: ${PORT}
========================================
  `);

});