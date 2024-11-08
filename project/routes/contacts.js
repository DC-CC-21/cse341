/**
 * This module handles the contacts route
 * @module routes/contacts
 * @requires express
 * @requires ./model/contacts
 */
const express = require("express");
const contactsRoute = express.Router();
const contacts = require("../model/contacts");

/**
 * GET /contacts/all
 * Get all the contacts in the database
 * @name Get all contacts
 * @function
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @returns {Promise<void>}
 */
contactsRoute.get("/all", async (req, res) => {
    const data = await contacts.getAll();
    res.json(data);
});

/**
 * GET /contacts/id/:id
 * Get a specific contact by id
 * @name Get contact by id
 * @function
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @returns {Promise<void>}
 */
contactsRoute.get("/id/:id", async (req, res) => {
    const data = await contacts.getById(req.params.id);
    res.json(data);
});

module.exports = contactsRoute;
