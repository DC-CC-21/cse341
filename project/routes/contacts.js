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
 * GET /contacts/
 * Get all the contacts in the database
 * @name Get all contacts
 * @function
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @returns {Promise<void>}
 */
contactsRoute.get("/", async (req, res) => {
  const data = await contacts.getAll();
  res.json(data);
});

/**
 * GET /contacts/:id
 * Get a specific contact by id
 * @name Get contact by id
 * @function
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @returns {Promise<void>}
 */
contactsRoute.get("/:id", async (req, res) => {
  const data = await contacts.getById(req.params.id);
  res.json(data);
});

/**
 * POST /contacts/
 * Create a new contact
 * @name Create contact
 * @function
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @returns {Promise<void>}
 */
contactsRoute.post("/", async (req, res) => {
  const data = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    birthday: req.body.birthday,
    favoriteColor: req.body.favoriteColor,
  }

  // Create a new contact in the database using the request body
  const contactID = await contacts.createNew(data);

  // Send the ID of the newly created contact as a JSON response
  res.json(contactID);
});

/**
 * PUT /contacts/:id
 * Update a contact with the given id
 * @name Update contact
 * @function
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @returns {Promise<void>}
 */
contactsRoute.put("/:id", async (req, res) => {
  const data = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    birthday: req.body.birthday,
    favoriteColor: req.body.favoriteColor,
  }
  // Update the contact with the given id using the request body
  const response = await contacts.update(req.params.id, data);
  const status = response ? 200 : 500;

  // Return a JSON response with the status of the update
  return res.status(status).json(status);
});

/**
 * DELETE /contacts/:id
 * Delete a contact with the given id
 * @name Delete contact
 * @function
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @returns {Promise<void>}
 */
contactsRoute.delete("/:id", async (req, res) => {
  // Delete the contact with the given id
  const response = await contacts.delete(req.params.id);
  const status = response ? 200 : 500;

  // Return a JSON response with the status of the deletion
  res.json(status);
});

module.exports = contactsRoute;
