function get_random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function IsNumeric(input)
{
  return (input - 0) == input && ('' + input).replace(/^\s+|\s+$/g, "").length > 0;
}


function Sudoku(n) {
  this.n = n;
  // матрица, сгенерированная по правилам судоку
  this.build_base_grid();

  this.amount = 10; // количество операций перетасовки
  // рандомные перетасовки матрицы amount раз
  this.mix();


  // сложность алгоритма, по умолчанию равна количеству элементов
  this.difficult = 1;

  // для использования указателя на объект класса внутри private-методов
  var that = this;

  // переменная solution и метод store_solution - приватные методы класса,
  // что не даст пользователю возможность просмотреть решение через консоль браузера
  var solution = [];

  // приватная функция сохранения результата генерации в приватную переменную solution
  var store_solution = function store_solution() {
    var table = [];
    for(var i = 0; i < that.n * that.n; i++) {
      var row = []

      for(var j = 0; j < that.n * that.n; j++) {
        row.push(that.table[i][j]);
      }
      table.push(row);
    }

    solution = table;
  }

  store_solution(); // вызов приватного метода

  // функция проверки определяется в конструкторе и является привелигированной - имеет доступ к private-членам класса
  this.check = function() {
    for(var i = 0; i < this.n * this.n; i++) {
      for(var j = 0; j < this.n * this.n; j++) {
        if(solution[i][j] != this.table[i][j]) {
          return false
        }
      }
    }
    return true
  }

  this.sudokize();
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

  this.table = table;
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


// поменять местами два района по горизонтали
Sudoku.prototype.swap_rows_area = function() {
  // #получение случайного района
  area1 = get_random(0, this.n - 1);
  area2 = get_random(0, this.n - 1);
  while (area1 == area2) {
    area2 = get_random(0, this.n - 1);
  }

  for(var i = 0; i < this.n; i++) {
    N1 = area1 * this.n + i;
    N2 = area2 * this.n + i;

    var tmp = this.table[N1]
    this.table[N1] = this.table[N2];
    this.table[N2]= tmp;
  }
};

// поменять местами два района по вертикали
Sudoku.prototype.swap_cols_area = function() {
  this.transponate();
  this.swap_rows_area();
  this.transponate();
};

// функция перетасовки матрицы
Sudoku.prototype.mix = function() {
  var amount = this.amount;
  for(var i = 0; i < this.amount; i++) {
    switch(get_random(1, 5)) {
      case 1:
        this.transponate();
        break
      case 2:
        this.swap_rows_small();
        break
      case 3:
        this.swap_cols_small();
        break
      case 4:
        this.swap_rows_area();
        break
      case 5:
        this.swap_cols_area();
        break
    }
  }
}

// функция удаления клеток. не учитывает количество решений, как следствие - может родиться нерешаемое судоку
Sudoku.prototype.sudokize = function() {
  // Всего в Судоку 81 клетка, обычно считают лёгким когда на поле есть 30-35 «подсказок», средним — 25-30, и сложным — 20-25.
  var amount;
  switch(this.difficult) {
    case 1:
      amount = get_random((this.n * 10), (this.n * 12));
      break
    case 2:
      amount = get_random((this.n * 8), (this.n * 10));
      break
    case 3:
      amount = get_random((this.n * 7), (this.n * 8));
      break
  }

  var deleted = 0;
  while(deleted < amount) {
    var i = get_random(0, Math.pow(this.n, 2) - 1);
    var j = get_random(0, Math.pow(this.n, 2) - 1);

    while(parseInt(this.table[i][j]) == 0) {
      var i = get_random(0, Math.pow(this.n, 2) - 1);
      var j = get_random(0, Math.pow(this.n, 2) - 1);
    }

    this.table[i][j] = 0;
    deleted++;
  }
}
