angular.module("hotelSearch")
//main app controller
.controller("MainCtrl", function($scope, HotelSearchService) {
  
  $scope.templates = [ 
        { name: 'main', url: 'views/main.html'},
        { name: 'result', url: 'views/result.html'} ];
      
  $scope.template = $scope.templates[0];

  //onload
  /*angular.element(document).ready(function () {
            
  });*/

})

//search widget controller
.controller("hotelSearchCtrl", function($scope, HotelSearchService) {

  angular.element(document).ready(function () {
    $scope.loadAutoComplete();
    $scope.changeNoDate();
    $scope.loadDatePickers();

    $('#frmSearch').submit(function(){
      $scope.goSearch($(this).serializeObject());
      return false;
    });

  });

  $scope.loadAutoComplete = function(){

    var hotels = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('hotel'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: [],
      limit: 10,
      prefetch: 'http://127.0.0.1:8000/v1/getprefetchedplaces',
      /*remote: 'http://127.0.0.1:8000/v1/gethotel?q=%QUERY'*/
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
      hint: false,
      highlight: false,
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
        //console.log(data);
        $("#destinyType").val('1');
        $("#destinyId").val(data.id);
    });
  }

  $scope.changeNoDate = function(){
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
  }

  $scope.loadDatePickers = function(){
    
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

  }

  $scope.goSearch = function(params){
    console.log(params);

  }

}); //end widget ctrl