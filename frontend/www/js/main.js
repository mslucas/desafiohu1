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
    minDate: new Date('2015-01-01'),
    maxDate: new Date('2016-12-31'),
    yearRange: [2015,2016],
    i18n: i18nCal,
    onSelect: function() {

    	//console.log(this.getMoment().format('L'));
    }
});

$('#hotelDataVolta').pikaday({
	title: "SAÍDA",
    firstDay: 1,
    numberOfMonths: 2,
    format:"DD/MM/YYYY",
    minDate: new Date('2015-01-01'),
    maxDate: new Date('2016-12-31'),
    yearRange: [2015,2016],
    i18n: i18nCal,
    onSelect: function() {
        //this.getMoment().format('L');
    }
});

