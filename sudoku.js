function get_random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function IsNumeric(input)
{
  return (input - 0) == input && ('' + input).replace(/^\s+|\s+$/g, "").length > 0;
}


function Sudoku(n, difficult) {
  this.n = parseInt(n);

  // сложность алгоритма
  this.difficult = parseInt(difficult);

  // количество операций перетасовки
  this.amount = get_random(10, 30);

  // для использования указателя на объект класса внутри private-методов
  var that = this;

  // переменная solution и метод store_solution - приватные методы класса,
  // что не даст пользователю возможность просмотреть решение через консоль браузера
  var solution = [];

  // ----------------приватные методы------------------------------------------------

  // генерация базовой сетки по правилам судоку
  var build_base_grid = function build_base_grid() {
    var table = [];
    for(var i = 0; i < that.n * that.n; i++) {
      var row = []

      for(var j = 0; j < that.n * that.n; j++) {
        row.push(parseInt((i * that.n + i / that.n + j) % (that.n * that.n) + 1));
      }
      table.push(row);
    }

    that.table = table;
  };

  // функция сохранения результата генерации в приватную переменную solution
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

  // транспонация матрицы (поворот на 90deg)
  var transponate = function transponate() {
    var table = that.table;

    for(var i = 0; i < table.length - 1; i++)
      for(var j = i + 1; j < table.length; j++){
        table[i][j] = table[i][j] - table[j][i];
        table[j][i] = table[i][j] + table[j][i];
        table[i][j] = table[j][i] - table[i][j];
      }

    that.table = table;
  };

  // перестановка строк в пределах одного района
  var swap_rows_small = function swap_rows_small() {
    // n - 1 потому что машина считает с 0, а n - количество. функция рандома включает его в промежуток,
    // но если мы возьмем 3, то выдйем за границы массива

    // получение случайного района и случайной строки
    area = get_random(0, that.n - 1);
    line1 = get_random(0, that.n - 1);
    N1 = area * that.n + line1 // номер 1 строки для обмена

    line2 = get_random(0, that.n - 1);
    while (line1 == line2) {
      line2 = get_random(0, that.n - 1);
    }

    N2 = area * that.n + line2 // номер 2 строки для обмена

    var tmp = that.table[N1];
    that.table[N1] = that.table[N2];
    that.table[N2] = tmp;
  };

  // перестановка столбцов в пределах одного района
  var swap_cols_small = function swap_cols_small() {
    transponate();
    swap_rows_small();
    transponate();
  };


  // поменять местами два района по горизонтали
  var swap_rows_area = function swap_rows_area() {
    // #получение случайного района
    area1 = get_random(0, that.n - 1);
    area2 = get_random(0, that.n - 1);
    while (area1 == area2) {
      area2 = get_random(0, that.n - 1);
    }

    for(var i = 0; i < that.n; i++) {
      N1 = area1 * that.n + i;
      N2 = area2 * that.n + i;

      var tmp = that.table[N1]
      that.table[N1] = that.table[N2];
      that.table[N2]= tmp;
    }
  };

  // поменять местами два района по вертикали
  var swap_cols_area = function swap_cols_area() {
    transponate();
    swap_rows_area();
    transponate();
  };

  // функция перетасовки матрицы
  var mix = function mix() {
    for(var i = 0; i < that.amount; i++) {
      switch(get_random(1, 5)) {
        case 1:
          transponate();
          break
        case 2:
          swap_rows_small();
          break
        case 3:
          swap_cols_small();
          break
        case 4:
          swap_rows_area();
          break
        case 5:
          swap_cols_area();
          break
      }
    }
  }

  // функция удаления клеток. не учитывает количество решений, как следствие - может родиться нерешаемое судоку
  var sudokize = function sudokize() {
    var amount = 0;
    var total = Math.pow(that.n, 4);

    switch(that.difficult) {
      case 1:
        amount = Math.floor(total / 100 * 25); // надо заполнить 25%
        break
      case 2:
        amount = Math.floor(total / 100 * 35); // 35%
        break
      case 3:
        amount = Math.floor(total / 100 * 45); // 45%
        break
    }

    var deleted = 0;
    while(deleted < amount) {
      var i = get_random(0, Math.pow(that.n, 2) - 1);
      var j = get_random(0, Math.pow(that.n, 2) - 1);

      while(parseInt(that.table[i][j]) == 0) {
        var i = get_random(0, Math.pow(that.n, 2) - 1);
        var j = get_random(0, Math.pow(that.n, 2) - 1);
      }

      that.table[i][j] = 0;
      deleted++;
    }
  }

  // ----------------------------------------------------------------------------------


  // матрица, сгенерированная по правилам судоку
  build_base_grid();

  // рандомные перетасовки матрицы amount раз
  mix();

  // вызов приватного метода
  store_solution();

  // функция проверки определяется в конструкторе и является привелигированной -
  // имеет доступ к private-членам класса, но доступна как public- метод
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

  sudokize();
}
