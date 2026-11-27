const express = require('express');
const router = express.Router();
const db = require('../models/database');

router.post('/book', (req, res) => {
    const { service_id, date, name, phone, guests } = req.body;
    const sql = `INSERT INTO bookings (service_id, date, name, phone, guests) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(sql, [service_id, date, name, phone, guests], function(err) {
        if (err) {
            console.error("Ошибка БД:", err.message);
            return res.status(500).json({ error: 'Ошибка при сохранении заявки' });
        }
        res.status(200).json({ id: this.lastID, message: 'Успешно забронировано' });
    });
});

router.get('/teas', (req, res) => {
    db.all("SELECT * FROM teas ORDER BY sort_order ASC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.get('/services', (req, res) => {
    db.all("SELECT * FROM services ORDER BY sort_order ASC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.get('/bookings', (req, res) => {
    const sql = `
        SELECT bookings.*, services.title as service_title 
        FROM bookings 
        LEFT JOIN services ON bookings.service_id = services.id 
        ORDER BY bookings.id DESC
    `;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;