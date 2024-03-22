const router = require("express").Router();
const pool = require("../db");
const authorized = require("../middleware/authorized");

router.get("/", authorized, async (req, res) => {
    try {
        const paints = await pool.query(
            "SELECT * FROM Paints"
        )
        // const checkQuantity = (quantity) => {
        //     if (quantity >= 10) return 'available'
        //     else if (quantity < 6) return 'low';
        //     else return 'out';
        // }
        // const allPaints = await paints.rows;
        // const paintQuantityCount = new Map();

        // for (let i = 0; i < allPaints.length; i++) {
        //     paintQuantityCount.set(paints.rows[i].color, checkQuantity(paints.rows[i].quantity));
        // }
        // console.log(paintQuantityCount)
        return res.json(paints.rows);
    } catch (error) {
        console.log('paints/', error.message);
    }
});

module.exports = router;