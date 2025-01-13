'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (!data.slug) {
      data.slug = uuidv4(); // Genera un UUID único como slug
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    if (!data.slug) {
      data.slug = uuidv4(); // Mantén un slug válido si falta
    }
  },
};
