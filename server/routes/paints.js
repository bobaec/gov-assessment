const router = require("express").Router();
const pool = require("../db");
const authorized = require("../middleware/authorized");

router.get("/", authorized, async (req, res) => {
    try {
        const paints = await pool.query(
            "SELECT * FROM Paints"
        )
        return res.json(paints.rows);
    } catch (error) {
        console.log('paints/', error.message);
    }
});

router.post('/update-subtract-by-one', authorized, async (req, res) => {
    try {
        const { color } = req.body;
        const result = await pool.query(
            "UPDATE Paints SET quantity = quantity - 1 WHERE color = $1", [color]
        );
        return res.json({ success: true });
    } catch (error) {
        console.log('paints/update', error.message);
    }
});

router.post('/update-add-by-one', authorized, async (req, res) => {
    try {
        const { color } = req.body;
        const result = await pool.query(
            "UPDATE Paints SET quantity = quantity + 1 WHERE color = $1", [color]
        );
        return res.json({ success: true });
    } catch (error) {
        console.log('paints/update', error.message);
    }
});

router.post('/update-single', authorized, async (req, res) => {
    try {
        const { color, quantity } = req.body;
        const result = await pool.query(
            "UPDATE Paints SET quantity = $1 WHERE color = $2", [quantity, color]
        );
        return res.json({ success: true });
    } catch (error) {
        console.log('paints/update', error.message);
    }
});

router.post('/update-bulk', authorized, async (req, res) => {
    try {
        const { blue, grey, black, white, purple } = req.body;
        // query checks for current quantity and updates based on color
        // then it adds based the quantity coming from req.body
        const result = await pool.query(
            `UPDATE Paints SET quantity = CASE
                WHEN color = 'Blue' THEN quantity + $1
                WHEN color = 'Grey' THEN quantity + $2
                WHEN color = 'Black' THEN quantity + $3
                WHEN color = 'White' THEN quantity + $4
                WHEN color = 'Purple' THEN quantity + $5
                ELSE quantity
                END
            `, [blue, grey, black, white, purple]
        );
        return res.json({ success: true });
    } catch (error) {
        console.log('paints/update', error.message);
    }
})

module.exports = router;