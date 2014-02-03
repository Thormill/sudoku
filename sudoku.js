function Sudoku(n) {
  this.n = n;
  // base_grid - матрица, сгенерированная по правилам судоку
  this.build_base_grid();

  // table - base_grid, подвергшийся математическим изменениям
  this.table = this.base_grid;

  // radnomizing magic
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

// транспонация матрицы (поворот на 90deg)
Sudoku.prototype.transponate = function() {
  var table = this.table;

  for(var i = 0; i < table.length - 1; i++)
    for(var j = i + 1; j < table.length; j++){
      table[i][j] = table[i][j] - table[j][i];
      table[j][i] = table[i][j] + table[j][i];
      table[i][j] = table[j][i] - table[i][j];
    }

  this.table = table;
};
