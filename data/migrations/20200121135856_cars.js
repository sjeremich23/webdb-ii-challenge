exports.up = function(knex, Promise) {
  return knex.schema.createTable("cars", cars => {
    cars.increments();

    cars
      .string("VIN", 17)
      .notNullable()
      .unique();
    cars.string("Make").notNullable();
    cars.string("Model").notNullable();
    cars.integer("Mileage").notNullable();
    cars.string("Transmission", 25);
    cars.string("Title_Status");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cars");
};
