const router = require("express").Router();
const pool = require("../db");

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query(
            "SELECT user_name, user_email, user_id, role_id, is_enabled FROM users WHERE user_email = $1 AND user_password = $2",
            [email, password]
        );
        if (user.rows.length === 0) {
            return res.json({ authenticated: false });
        } else {
            return res.json({ authenticated: true, info: user.rows[0] });
        }
    } catch (error) {
        console.log("login", error.message);
        res.status(500).send("Server Error, could not login");
    }
});

module.exports = router;
