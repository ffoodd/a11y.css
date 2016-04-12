module.exports = function (err) {
  console.log(err);
  this.emit('end');
};
