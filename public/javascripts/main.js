function validateObj(obj, int) {
  if (obj === undefined || obj === null || obj === "null") {
    return obj = int === true ? 0 : "";
  } else {
    return obj = int === true ? parseInt(obj, 10) : obj;
  }
}

function calculatePercentage(qt, total) {
  if (total !== 0) {
    return parseInt(((qt / total) * 100).toFixed(2));
  } else {
    return 0;
  }
}

function carregarGrid(dataRaking) {

  //Ordena pela % de gostam
  dataRaking.sort(function (a, b) {
    return b.positive - a.positive;
  });

  for (i = 0; i < dataRaking.length; i++) {
    var item = dataRaking[i];
    var dataWrap = "<div class='data-wrap'>" +
      "<div class='data-img'>" +
      "<img class='img-circle' src='" + item.urlImg + "' />" +
      "<span class='badge'>" + (i + 1) + "</span>" +
      "</div>" +
      "<div class='data-details'>" +
      "<span class='name'>" + item.name + "</span>" +
      "<span class='desc'>" + item.description + "</span>" +
      "</div>" +
      "<div class='balloon d-none'>" +
      "<div class='like'><span>Gostam</span>" +
      "<span class='percent-like' > " + item.positive + " %</span ></div> " +
      "<div class='deslike'><span>Não gostam</span>" +
      "<span class='percent-deslike' > " + item.negative + " %</span ></div> " +
      "</div> " +
      "</div>"

    $('.grid-ranking').append(dataWrap);
  }
}

$(document).ready(function () {

  var arrData = [];

  $.getJSON("fazenda.json", function (result) {
  })
    .done(function (result) {
      var list = result.data;

      $(list).each(function (index) {
        let name = validateObj(list[index].name, false);
        let description = validateObj(list[index].description, false);
        let urlImg = validateObj(list[index].picture, false);
        let qtNegative = validateObj(list[index].negative, true);
        let qtPositive = validateObj(list[index].positive, true);
        let total = qtNegative + qtPositive;
        let percentNegative = calculatePercentage(qtNegative, total);
        let percentPositive = calculatePercentage(qtPositive, total);

        if (name !== "") {
          arrData.push({
            name: name,
            negative: percentNegative,
            positive: percentPositive,
            description: description,
            urlImg: urlImg
          });
        }
      });

      carregarGrid(arrData);

    })
    .fail(function (result) {
      alert('Erro ao buscar dados');
    });

  $(document).on("click", ".data-wrap", function () {
    var self = $(this);

    if ($(self).find('.balloon').hasClass('d-none')) {
      $(".data-wrap").find('.balloon').addClass('d-none');
      $(".data-wrap").removeClass('selected');
      $(self).addClass('selected');
      $(self).find('.balloon').removeClass('d-none');
    } else {
      $(".data-wrap").find('.balloon').addClass('d-none');
      $(".data-wrap").removeClass('selected');

    }

  });

});
