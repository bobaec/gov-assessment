const router = require("express").Router();
const pool = require("../db");
const authorized = require("../middleware/authorized");

router.get('/all-users', authorized, async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Users");
        return res.json(result.rows)
    } catch (error) {
        console.log('all-users', error.message)
    }
});

router.post('/enable-or-disable-user', authorized, async (req, res) => {
    try {
        const { userId, isEnabled } = req.body;
        const result = await pool.query("UPDATE Users SET is_enabled = $1 WHERE user_id = $2", [isEnabled, userId]);
        return res.json(true);
    } catch (error) {
        console.log('enable-or-disable-user', error.message);
    }
});

router.post('/change-role', authorized, async (req, res) => {
    try {
        const { userId, role } = req.body;
        console.log(role);
        const result = await pool.query("UPDATE Users SET role_id = $1 WHERE user_id = $2", [role, userId]);
        return res.json(true);
    } catch (error) {
        console.log('change-role', error.message);
    }
});

router.post('/update-name', authorized, async (req, res) => {
    try {
        const { userId, name } = req.body;
        const result = await pool.query("UPDATE Users SET user_name = $1 WHERE user_id = $2", [name, userId]);
        return res.json(true);
    } catch (error) {
        console.log('change-role', error.message);
    }
});

router.post('/update-email', authorized, async (req, res) => {
    try {
        const { userId, email } = req.body;
        const result = await pool.query("UPDATE Users SET user_email = $1 WHERE user_id = $2", [email, userId]);
        return res.json(true);
    } catch (error) {
        console.log('change-role', error.message);
    }
});

module.exports = router;