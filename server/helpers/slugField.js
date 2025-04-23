const slugify = require("slugify");

const slugField = (field) => {
  return slugify(field, {
    replacement: "-",
    lower: true,
    strict: true,
  });
};
module.exports = slugField;