const router = require("express").Router();
const pool = require("../db");
const authorized = require("../middleware/authorized");

router.get('/all-users', authorized, async (req, res) => {
    try {
        const result = await pool.query("SELECT user_id, user_name, user_email, is_enabled, role_id FROM Users");
        return res.json(result.rows)
    } catch (error) {
        console.log('all-users', error.message)
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/enable-or-disable-user', authorized, async (req, res) => {
    try {
        const { userId, isEnabled } = req.body;
        const result = await pool.query("UPDATE Users SET is_enabled = $1 WHERE user_id = $2", [isEnabled, userId]);
        return res.json({ success: true });
    } catch (error) {
        console.log('enable-or-disable-user', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/change-role', authorized, async (req, res) => {
    try {
        const { userId, role } = req.body;
        console.log(role);
        const result = await pool.query("UPDATE Users SET role_id = $1 WHERE user_id = $2", [role, userId]);
        return res.json({ success: true });
    } catch (error) {
        console.log('change-role', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/update-name', authorized, async (req, res) => {
    try {
        const { userId, name } = req.body;
        const result = await pool.query("UPDATE Users SET user_name = $1 WHERE user_id = $2", [name, userId]);
        return res.json({ success: true });
    } catch (error) {
        console.log('change-role', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/update-email', authorized, async (req, res) => {
    try {
        const { userId, email } = req.body;
        const result = await pool.query("UPDATE Users SET user_email = $1 WHERE user_id = $2", [email, userId]);
        return res.json({ success: true });
    } catch (error) {
        console.log('change-role', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;