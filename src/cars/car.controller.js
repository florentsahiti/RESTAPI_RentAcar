const Car = require("../models/car.model");
const { CarStatus } = require("../utils/enums");
const { ObjectId } = require("mongodb");

const createCar = async (req, res) => {
  try {
    const {
      name,
      price_per_day,
      year,
      color,
      steering_type,
      number_of_seats,
      status,
    } = req.body;
    if (
      !name ||
      !price_per_day ||
      !year ||
      !color ||
      !steering_type ||
      !number_of_seats
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (status && !CarStatus.isValid(status)) {
      return res.status(400).json({
        error: `Status must be one of: ${CarStatus.getValues().join(", ")}`,
      });
    }
    const car = new Car(
      name,
      price_per_day,
      year,
      color,
      steering_type,
      number_of_seats,
      status
    );
    await req.db.collection("cars").insertOne(car.toDocument());
    res.status(201).json({
      message: "Car created successfully",
      car: car.toDocument(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create car" });
  }
};

const getCars = async (req, res) => {
  try {
    const {
      status,
      year,
      color,
      steering_type,
      number_of_seats,
    } = req.query;
    let query = {};
    if (status) {
      if (!CarStatus.isValid(status)) {
        return res.status(400).json({
          error: `Invalid status. Must be one of: ${CarStatus.getValues().join(
            ", "
          )}`,
        });
      }
      query.status = status;
    }
    if (year) {
      query.year = parseInt(year);
    }
    if (color) {
      query.color = color.toLowerCase();
    }
    if (steering_type) {
      query.steering_type = steering_type.toLowerCase();
    }
    if (number_of_seats) {
      query.number_of_seats = parseInt(number_of_seats);
    }
    const cars = await req.db.collection("cars").find(query).toArray();
    res.status(200).json({
      message: "Cars fetched successfully",
      cars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
};

const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await req.db.collection("cars").findOne({
      _id: new ObjectId(id),
    });
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json({
      message: "Car fetched successfully",
      car,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch car" });
  }
};

module.exports = {
  createCar,
  getCars,
  getCarById,
};
