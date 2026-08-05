const express = require("express");
const router = express.Router();

const characters = [
    { id: 1, name: "Axl", health: 100, attack: 10, defense: 5 },
    { id: 2, name: "Ryu", health: 100, attack: 10, defense: 5 },
    { id: 3, name: "Ken", health: 100, attack: 10, defense: 5 },
    { id: 4, name: "Chun-Li", health: 100, attack: 10, defense: 5 },
];

const stats = {};

router.get("/", (req, res) => {
    res.send("Hello from my test routes");
});

router.get("/calculate-stats", (req, res) => {
    //add two stats together

    const totalHealth = characters.reduce((acc, curr) => acc + curr.health, 0);
    const totalAttack = characters.reduce((acc, curr) => acc + curr.attack, 0);
    const totalDefense = characters.reduce(
        (acc, curr) => acc + curr.defense,
        0,
    );

    stats.totalHealth = totalHealth;
    stats.totalAttack = totalAttack;
    stats.totalDefense = totalDefense;

    //send okay status no data
    res.status(200).send();
});

router.get("/stats", (req, res) => {
    res.json(stats);
});

router.get("/fighters", (req, res) => {
    res.send("Hello World!");
});

router.get("/characters", (req, res) => {
    res.json(characters);
});

router.get("/characters/:id", (req, res) => {
    const character = characters.find((c) => c.id === parseInt(req.params.id));
    res.json(character);
});

router.get("/maps", (req, res) => {
    res.send("Second test");
});

module.exports = router;
