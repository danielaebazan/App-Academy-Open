const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    res.json("/colors");
});

router.get("/colors/:name", (req, res) => {
    res.json("colors/:name")
})

router.post("/colors/:name/css-styles", (req, res) => {
    res.json("POST /colors/:name/css-styles");
});

router.delete("/colors/:name/css-styles/:style", (req, res) => {
    res.json("DELETE /colors/:name/css-styles/:style");
});

module.exports = router;