function Sudoku(n) {
  this.n = n;
  this.build_base_grid();

  // this.base_grid = [];
  // this.table = [];
}

// генерация базовой сетки по правилам судоку
Sudoku.prototype.build_base_grid = function() {
  var table = [];
  for(var i = 0; i < this.n * this.n; i++) { // от 1 до 9
    var row = []

    for(var j = 0; j < this.n * this.n; j++) {
      row.push(parseInt((i * this.n + i / this.n + j) % (this.n * this.n) + 1));
    }
    table.push(row);
  }

  this.base_grid = table;
};

// Animal.prototype.transpanate = function() {
//   this.speed = 0;
//   alert(this.name + ' стоит');
// };

// // свойство speed со значением "по умолчанию"
// Animal.prototype.speed = 0;

// var animal = new Animal('Зверь');

// alert(animal.speed);               // 0, свойство взято из прототипа
// animal.run(5);                     // Зверь бежит, скорость 5
// animal.run(5);                     // Зверь бежит, скорость 10
// animal.stop();                     // Зверь стоит
