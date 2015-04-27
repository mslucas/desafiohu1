angular.module("hotelSearch")

//main app controller
.controller("MainCtrl", function($scope, HotelSearchService) {

  $scope.templates = [ 
        { name: 'main', url: 'views/main.html'},
        { name: 'result', url: 'views/result.html'} ];
      
  $scope.template = $scope.templates[0];

  $scope.showResultView = function(result){
    $scope.template = $scope.templates[1];
    $scope.searchResult = result;
    $scope.$apply();
  }

  $scope.showMainView = function(){
    $scope.template = $scope.templates[0];
    //$scope.$apply();
  }

})

//search widget controller
.controller("hotelSearchCtrl", function($scope, HotelSearchService) {

  //$scope.searchResult = []; //resultados da busca

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
     
    var places = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('cidade'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: [],
      limit: 10,
      prefetch: 'http://127.0.0.1:8000/v1/getPreFetchedPlaces',
      /*remote: 'http://127.0.0.1:8000/v1/getPlace?q=%QUERY'*/
    });
    
    var hotels = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('hotel'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: [],
      limit: 10,
      prefetch: 'http://127.0.0.1:8000/v1/getPreFetchedHotels',
      /*remote: 'http://127.0.0.1:8000/v1/getHotel?q=%QUERY'*/
    });
    
    places.initialize();
    hotels.initialize();
    
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
          'Nenhum hotel encontrado com este nome.',
          '</div>'
        ].join('\n'),
        suggestion: Handlebars.compile('<p class="icon-suitcase">&nbsp;<strong>{{hotel}}</strong> – {{cidade}}</p>')
      }
    },
    {
      name: 'places',
      displayKey: 'cidade',
      source: places.ttAdapter(),
      templates: {
        empty: [
          '<div class="empty-message">',
          'Nenhum local encontrado com este nome.',
          '</div>'
        ].join('\n'),
        //"icon-search","icon-suitcase","icon-location2"
        suggestion: Handlebars.compile('<p class="icon-location2">&nbsp;<strong>{{cidade}}</strong> – Brasil</p>')
      }
    }
    ).on('typeahead:selected', function (obj, data) {
        var type = (data.type != undefined) ? data.type : 1; //tipo de pesquisa
        $("#destinyType").val(type);
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

    if(params.destinyId != "" && params.destinyType != ""){
        
        var items = [
          {
            id:1,
            img:"http://localhost:12345/img/places/hotel1.jpeg",
            name:"Mercatto Casa Hotel",
            value: 259.98
          },
          {
            id:2,
            img:"http://localhost:12345/img/places/hotel2.jpeg",
            name:"Boulevard Higienopolis Residence Hotel",
            value: 199.00
          },
          {
            id:3,
            img:"http://localhost:12345/img/places/hotel3.jpeg",
            name:"Lucca Hotel Pousada",
            value: 135.50
          }
        ];

        $scope.showResultView(items); //mostra a tela resultados
    }
    else{
        alert('Selecione um destino!');
    }
  }

  $scope.buyThis = function(item){
    alert('comprado!');
  }


  $scope.goNewSearch = function(){
    //limpa a busca e joga pra main
    $scope.showMainView();
  }


}); //end widget ctrl