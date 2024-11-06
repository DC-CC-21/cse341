const contacts = require("../model/contacts");



const contactsRoute = require("express").Router()

contactsRoute.get("/all", async (req, res) => {
    const data = await contacts.getAll();
    res.json(data)
})
contactsRoute.get("/id/:id", async (req, res) => {
    const data = await contacts.getById(req.params.id)
    res.json(data)
})


module.exports = contactsRoute