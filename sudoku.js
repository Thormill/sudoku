function get_random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



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

// перестановка строк в пределах одного района
Sudoku.prototype.swap_rows_small = function() {
  // берем рандомную строку
  area = get_random(0, this.n - 1);
  line1 = get_random(0, this.n - 1);
  // получение случайного района и случайной строки
  N1 = area * this.n + line1 // номер 1 строки для обмена

  line2 = get_random(0, this.n - 1);
  while (line1 == line2) {
    line2 = get_random(0, this.n - 1);
  }

  N2 = area * this.n + line2 // номер 2 строки для обмена

  var tmp = this.table[N1];
  this.table[N1] = this.table[N2];
  this.table[N2] = tmp;
};

// перестановка столбцов в пределах одного района
Sudoku.prototype.swap_cols_small = function() {
  this.transponate();
  this.swap_rows_small();
  this.transponate();
};
