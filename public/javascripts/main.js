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
    var dataWrap = "<li class='data-wrap' tabindex='0' role='button'>" +
      "<div class='data-img'>" +
      "<img class='img-circle' src='" + item.urlImg + "' tabindex='0' alt='foto, participante, " + item.name + ".' />" +
      "<span class='badge' aria-label='número do ranking' tabindex='0'>" + (i + 1) + "</span>" +
      "</div>" +
      "<div class='data-details'>" +
      "<span class='name' tabindex='0'>" + item.name + "</span>" +
      "<span class='desc' tabindex='0'>" + item.description + "</span>" +
      "</div>" +
      "<div class='balloon d-none' tabindex='0' role='complementary'>" +
      "<div class='like'><span tabindex='0'>Gostam</span>" +
      "<span class='percent-like' role='complementary' tabindex='0'" +
      "aria-label='porcentagem positiva para, " + item.name + "' > " + item.positive + " %</span></div> " +
      "<div class='deslike'><span tabindex='0'>Não gostam</span>" +
      "<span class='percent-deslike' role='complementary' tabindex='0'" +
      "aria-label='porcentagem negativa para, " + item.name + "'> " + item.negative + " %</span></div> " +
      "</div> " +
      "</li>"

    $('.list-ranking').append(dataWrap);
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
