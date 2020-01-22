exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          vin: "2A7HF16Y8TS510206",
          make: "Dodge",
          model: "Ram",
          mileage: 100000,
          transmission: "standard",
          Title_Status: "salvage"
        },
        {
          vin: "1B7HF16Y8TS510206",
          make: "Ford",
          model: "Mustang",
          mileage: 5000,
          transmission: "standard",
          Title_Status: "clean"
        },
        {
          vin: "1F7HF16Y8TS520505",
          make: "Chevrolet",
          model: "Camaro",
          mileage: 7500,
          transmission: "standard",
          Title_Status: "clean"
        }
      ]);
    });
};
