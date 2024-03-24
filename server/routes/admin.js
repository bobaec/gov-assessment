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

module.exports = router;