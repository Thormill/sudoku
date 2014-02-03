function get_random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



function Sudoku(n) {
  this.n = n;
  // base_grid - матрица, сгенерированная по правилам судоку
  this.build_base_grid();

  // table - base_grid, подвергшийся математическим изменениям
  this.table = this.base_grid;

  this.amount = 10; // количество операций перетасовки

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

// функция для удаления элементов
Sudoku.prototype.perform = function() {

}
// flook = [[0 for j in range(example.n*example.n)] for i in range(example.n*example.n)]
// iterator = 0
// difficult = example.n ** 4 #Первоначально все элементы на месте

// while iterator < example.n ** 4:
//     i,j = random.randrange(0, example.n*example.n ,1), random.randrange(0, example.n*example.n ,1) # Выбираем случайную ячейку
//     if flook[i][j] == 0:  #Если её не смотрели
//         iterator += 1
//         flook[i][j] = 1   #Посмотрим

//         temp = example.table[i][j]  #Сохраним элемент на случай если без него нет решения или их слишком много
//         example.table[i][j] = 0
//         difficult -= 1 #Усложняем, если убрали элемент

//         table_solution = []
//         for copy_i in range(0, example.n*example.n):
//             table_solution.append(example.table[copy_i][:]) #Скопируем в отдельный список

//         i_solution = 0
//         for solution in solver.solve_sudoku((example.n, example.n), table_solution):
//             i_solution += 1 #Считаем количество решений

//         if i_solution != 1: #Если решение не одинственное -- вернуть всё обратно
//             example.table[i][j] = temp
//             difficult += 1  #Облегчаем

// example.show()
// print "difficult = ",difficult