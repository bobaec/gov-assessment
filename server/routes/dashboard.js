const router = require("express").Router();
const pool = require("../db");

router.get("/", async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT user_name FROM users WHERE user_id = $1",
            [req.user]
        );
        return res.json(user.rows[0]);
    } catch (error) {
        console.log("dashboard", error.message);
        res.status(500).json("Server Error");
    }
});



module.exports = router;
