const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1
  `, [email])
  .then(res => {
    if (res.rows.length) {
      return res.rows[0];
    }
    return null;
  });
}

exports.getUserWithEmail = getUserWithEmail;

// const getUserWithEmail = function(email) {
//   let user;
//   for (const userId in users) {
//     user = users[userId];
//     if (user.email.toLowerCase() === email.toLowerCase()) {
//       break;
//     } else {
//       user = null;
//     }
//   }
//   return Promise.resolve(user);
// }

// getUserWithId
// Will do the same as getUserWithEmail, but using the user's id instead of email.

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

// const getUserWithId = function(id) {
//   return Promise.resolve(users[id]);
// }

const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users
  WHERE id = $1
  `, [id])
  .then(res => {
    if (res.rows.length) {
      return res.rows[0];
    } 
    return null;
  });
}

exports.getUserWithId = getUserWithId;

// addUser
// Accepts a user object that will have a name, email, and hashed password property.
// This function should insert the new user into the database.
// It will return a promise that resolves with the new user object. 
// This object should contain the user's id after it's been added to the database.
// Add RETURNING *; to the end of an INSERT query to return the objects that were inserted. 
// This is handy when you need the auto generated id of an object you've just added to the database.

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

const addUser = function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING*;
  `, [user.name, user.email, user.password])
  .then (res => {
    if (res.rows.length) {
      return res.rows[0];
    }
      return null;
  });
}

exports.addUser = addUser;

// const addUser =  function(user) {
//   const userId = Object.keys(users).length + 1;
//   user.id = userId;
//   users[userId] = user;
//   return Promise.resolve(user);
// }

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

// This function accepts a guest_id, limits the properties to 10 and returns a promise. 
// The promise should resolve reservations for that user. 
// Use the All My Reservations query that you made in a previous assignments.

const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2`, [guest_id, limit])
  .then (res => {
    if (res.rows.length) {
      return res.rows;
    }
    return null;
  });
}

// const getUserWithId = function(id) {
//   return pool.query(`
//   SELECT * FROM users
//   WHERE id = $1
//   `, [id])
//   .then(res => {
//     if (res.rows.length) {
//       return res.rows[0];
//     } 
//     return null;
//   });
// }

exports.getAllReservations = getAllReservations;

// const getAllReservations = function(guest_id, limit = 10) {
//   return getAllProperties(null, 2);
// }

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
// const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// }

const getAllProperties = function(options, limit = 10) {
  return pool.query(`
  SELECT * FROM properties
  LIMIT $1
  `, [limit])
  .then(res => res.rows);
}

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
