const db = require('../db');


const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  const queryStr = `
    SELECT *
    FROM users
    WHERE email = $1
  `
  return db.query(queryStr, [email])
    .then(res => res.rows[0])
    .catch(() => null)
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryStr = `
  SELECT *
  FROM users
  WHERE id = $1
  `
  return db.query(queryStr, [id])
    .then(res => res.rows[0])
    .catch(() => null)
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryStr = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `
  return db.query(queryStr, [user.name, user.email, user.password])
    .then(res => res.rows[0])
    .catch(() => null)
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryStr = `
    SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
    JOIN reservations ON reservations.property_id = properties.id 
    JOIN property_reviews ON property_reviews.property_id = properties.id 
    WHERE reservations.end_date < now()::date 
    AND property_reviews.guest_id = $1
    GROUP BY reservations.id, properties.id
    ORDER BY reservations.start_date
    LIMIT $2
  `
  return db.query(queryStr, [guest_id, limit])
      .then(res => res.rows)
      .catch(() => null);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_id
    `
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id && queryParams.length === 0) {
    queryParams.push(options.owner_id);
    queryString += `WHERE owner_id = $${queryParams.length} `;
  } else if (options.owner_id && queryParams.length !== 0) {
    queryParams.push(options.owner_id);
    queryString += `
    AND owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night && queryParams.length === 0) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `WHERE properties.cost_per_night >= $${queryParams.length} `;
  } else if (options.minimum_price_per_night && queryParams.length !== 0) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `
    AND properties.cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night && queryParams.length === 0) {
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `WHERE cost_per_night <= $${queryParams.length} `;
  } else if (options.maximum_price_per_night && queryParams.length !== 0) {
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `
    AND cost_per_night <= $${queryParams.length} `;
  }

  if (options.minimum_rating && queryParams.length === 0) {
    queryParams.push(options.minimum_rating);
    queryString += `WHERE property_reviews.rating >= $${queryParams.length} `;
  } else if (options.minimum_rating && queryParams.length !== 0) {
    queryParams.push(options.minimum_rating);
    queryString += `
    AND property_reviews.rating >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return db.query(queryString, queryParams)
    .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night * 100, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms]

  console.log(values)

  const queryStr = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `
  return db.query(queryStr, values)
    .then(res => res.rows)
}
exports.addProperty = addProperty;
