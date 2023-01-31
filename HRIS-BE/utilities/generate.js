exports.generateUniqueCode = () => {
  return (
    "HRIS-" +
    Math.random().toString(15).substring(2, 5) +
    Math.random().toString(15).substring(2, 5)
  );
};

exports.generateUniqueCode2 = (unique_id) => {
  return (
    unique_id +
    "-" +
    Math.random().toString(15).substring(2, 5) +
    Math.random().toString(15).substring(2, 5)
  );
};
