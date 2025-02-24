const { ObjectId } = require("mongodb");
const { CarStatus } = require("../utils/enums");

class Car {
  constructor(
    name,
    price_per_day,
    year,
    color,
    steering_type,
    number_of_seats,
    status = CarStatus.AVAILABLE
  ) {
    this._id = new ObjectId();
    this.name = name;
    this.price_per_day = price_per_day;
    this.year = year;
    this.color = color;
    this.steering_type = steering_type;
    this.number_of_seats = number_of_seats;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  toDocument() {
    return {
      _id: this._id,
      name: this.name,
      price_per_day: this.price_per_day,
      year: this.year,
      color: this.color,
      steering_type: this.steering_type,
      number_of_seats: this.number_of_seats,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = Car;
