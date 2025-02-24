const CarStatus = {
  AVAILABLE: "available",
  RENTED: "rented",
  isValid(status) {
    return [this.AVAILABLE, this.RENTED].includes(status);
  },
  getValues() {
    return [this.AVAILABLE, this.RENTED];
  },
};

module.exports = {
  CarStatus,
};
