const router = require("express").Router();
const pool = require("../db");

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('here', email, password);
        const user = await pool.query(
            "SELECT * FROM users WHERE user_email = $1 AND user_password = $2",
            [email, password]
        );
        if (user.rows.length === 0) {
            return res.json(false);
        } else {
            return res.json(true);
        }
    } catch (error) {
        console.log("login", error.message);
        res.status(500).send("Server Error, could not login");
    }
});

module.exports = router;
