function human_size(i) {
  var result = "";
  switch(parseInt(i)){
    case 2:
      result = "2x2"
      break
    case 3:
      result = "2x2"
      break
    case 4:
      result = "2x2"
  }
  return result;
}

function human_difficult(i) {
  var result = "";
  switch(parseInt(i)){
    case 1:
      result = "легкий"
      break
    case 2:
      result = "средний"
      break
    case 3:
      result = "трудный"
  }
  return result;
}

$(document).ready(function(){
  var sudoku;

  $('#generator').click(function(){
    var size = $('#settings input[name="size"]:checked').val();
    var difficulty = $('#settings input[name="difficulty"]:checked').val();

    sudoku = new Sudoku(size, difficulty);

    var table = $('#sudoku');
    var sHtml = '';

    // $('#settings input').each(function(elem){
    //   $(this).prop('disabled', true);
    // });

    $.each(sudoku.table, function( i, row ) {
      sHtml += '<tr>';
      $.each(row, function( j, elem ) {
        if(parseInt(elem) > 0) {
          sHtml += '<td class="fixed" data-row="' + i + '" data-col="' + j + '"><span>' + elem + '</span></td>';
        }
        else {
          sHtml += '<td class="editable" data-row="' + i + '" data-col="' + j + '"><input type="text" class="hidden" /><span>&nbsp;<span></td>';
        }
      });
      sHtml += '</tr>';
    });

    $(table).html(sHtml);

    switch(parseInt(size)){
      case 2:
        $('#sudoku tr td[data-col="1"]').css('border-right-width', '3px');
        $('#sudoku tr td[data-row="1"]').css('border-bottom-width', '3px');
        break
      case 3:
        $('#sudoku tr td[data-col="2"]').css('border-right-width', '3px');
        $('#sudoku tr td[data-col="5"]').css('border-right-width', '3px');
        $('#sudoku tr td[data-row="2"]').css('border-bottom-width', '3px');
        $('#sudoku tr td[data-row="5"]').css('border-bottom-width', '3px');
        break
      case 4:
        $('#sudoku tr td[data-col="3"]').css('border-right-width', '3px');
        $('#sudoku tr td[data-col="7"]').css('border-right-width', '3px');
        $('#sudoku tr td[data-col="11"]').css('border-right-width', '3px');
        $('#sudoku tr td[data-row="3"]').css('border-bottom-width', '3px');
        $('#sudoku tr td[data-row="7"]').css('border-bottom-width', '3px');
        $('#sudoku tr td[data-row="11"]').css('border-bottom-width', '3px');
    }


    $('.editable').click(function(){
      $(this).children('input').removeClass('hidden');
      $(this).children('span').addClass('hidden');
      $(this).children('input').focus();
    });

    $('.editable input').blur(function(){
      var parent = $(this).parent();
      var value = $(parent).children('input').val();
      // только цифры
      if(!IsNumeric(value) || parseInt(value) > 99) {
        value = '';
        $(parent).children('input').val('');
      }

      $(parent).children('input').addClass('hidden');
      $(parent).children('span').html(value);
      $(parent).children('span').removeClass('hidden');

      if(value == ''){
        return true
      }

      sudoku.move($(parent).data("row"), $(parent).data("col"), value);

      if(sudoku.check() == true) {
        var name = prompt("Поздравляем, вы прошли sudoku за " + sudoku.count_moves() + " ходов!\nКак нам вас увековечить в таблице рекордов?", "Anonymous");

        $.post('http://sudoku.bl.ee/records.php', {"moves":sudoku.count_moves(), "name":name, "difficulty":sudoku.difficult, "size":sudoku.n}).success(function(data){
          decoded_data = jQuery.parseJSON(data);
          var sTable = ''
          $(decoded_data).each(function(index, elem){
            sHtml = '';
            sHtml += '<tr><td>' + index + '</td><td>' + elem.name + '</td><td>' + human_size(elem.size) + '</td><td>' + human_difficult(elem.difficulty) + '</td><td>' + elem.moves + '</td></tr>';
            $('#records').removeClass("hidden");
            sTable += sHtml;
          });
          $('#records tbody').html(sTable);
        });
      }
    });
  });
});

