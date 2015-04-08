var i18nCal = {
    previousMonth : 'Mês Anterior',
    nextMonth     : 'Próximo Mês',
    months        : ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    weekdays      : ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    weekdaysShort : ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
}

$('#hotelDataIda').pikaday({
	title: "ENTRADA",
    firstDay: 1,
    numberOfMonths: 2,
    format:"DD/MM/YYYY",
    minDate: new Date(),
    yearRange: [2015,2016],
    i18n: i18nCal,
    onSelect: function(date) {
    	var nextDay = moment(date).add(1, 'days').toDate();
    	//seta a data da volta para [data ida +1]
    	$('#hotelDataVolta').pikaday('setMinDate', nextDay);
		$('#hotelDataVolta').pikaday('setDate', nextDay);
    	//seleciona a dt de volta depois de selecionar a ida
    	$('#hotelDataVolta').pikaday('show'); 
    }
});

$('#hotelDataVolta').pikaday({
	title: "SAÍDA",
    firstDay: 1,
    numberOfMonths: 2,
    format:"DD/MM/YYYY",
    yearRange: [2015,2016],
    setDefaultDate: true,
    i18n: i18nCal
});


var hotels = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('hotel'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: 'dataset/hotels.json'
});
/* 
var cities = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: '../data/nhl.json'
});*/
 
hotels.initialize();
//cities.initialize();
 
$('.typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 3
},
{
  name: 'hotels',
  displayKey: 'hotel',
  source: hotels.ttAdapter(),
  templates: {
    empty: [
      '<div class="empty-message">',
      'Nenhum resultado encontrado!',
      '</div>'
    ].join('\n'),
    suggestion: Handlebars.compile('<p class="icon-suitcase">&nbsp;<strong>{{hotel}}</strong> – {{cidade}}</p>')
  }
}/*,
{
  name: 'cities',
  displayKey: 'city',
  source: cities.ttAdapter(),
  templates: {
    empty: [
      '<div class="empty-message">',
      'Nenhum hotel encontrado com este nome.',
      '</div>'
    ].join('\n'),
    //"icon-search","icon-suitcase","icon-location2"
    suggestion: Handlebars.compile('<p class="icon-suitcase">&nbsp;<strong>{{hotel}}</strong> – {{cidade}}</p>')
  }
}*/

).on('typeahead:selected', function (obj, data) {
    console.log(data);
    $("#selectedHotel").val(data.id);
});


$('#nodate').change(function(event){
	if($(this).is(':checked')){
		$('#hotelDataIda').prop('disabled', true).val('');
		$('#hotelDataVolta').prop('disabled', true).val('');
	}
	else{
		$('#hotelDataIda').prop('disabled', false);
		$('#hotelDataVolta').prop('disabled', false);
	}
});




