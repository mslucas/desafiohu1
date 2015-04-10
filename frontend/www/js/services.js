angular.module("hotelSearch").factory("HotelSearchService",  function() {
    
    var nomeRestaurante = "The Basement English Pub";
    var pedido = [];
    var valorTotal = 0;
    
    var cardapio = [
        { name: "Trident", value: 3, img: "img/trident.jpg", details: "Unidade" },
        { name: "Johnnie Walker Red", value: 150, img: "img/jwred.jpg", details: "Garrafa 900ml" },
        { name: "Pão", value: 30, img: "img/pao.jpg", details: "500gr" }
    ];
    
    
    var soma = function(produto) {
        valorTotal += produto.value;
    }
    
    
    return {
        getRestauranteName: function() {
            return nomeRestaurante;
        },
        
        getCardapio: function() {
            return cardapio;
        },
    
        getItemCardapio: function(itemId) {
            return cardapio[itemId];
        },
        
        getPedido: function() {
            return pedido;
        },
        
        addToPedido: function(produto) {
            if(produto){
                produto.date = Date.now();
                pedido.push(angular.copy(produto));
                soma(produto);
            }
            else{
                return false;
            }
        },
        
        remFromPedido: function(produto) {
            if(produto){
                var produtoId = pedido.indexOf(produto);
                pedido.splice(produtoId, 1);
                valorTotal -= produto.value;
            }
        },
        
        getValorTotal: function() {
            return valorTotal;
        } 
    }
    
});

/*

angular.module("hotelSearch").factory("HotelSearchService",  function() {
    
    var nomeRestaurante = "The Basement English Pub";
    var pedido = [];
    var valorTotal = 0;
    
    var cardapio = [
        { name: "Trident", value: 3, img: "img/trident.jpg", details: "Unidade" },
        { name: "Johnnie Walker Red", value: 150, img: "img/jwred.jpg", details: "Garrafa 900ml" },
        { name: "Pão", value: 30, img: "img/pao.jpg", details: "500gr" }
    ];
    
    
    var soma = function(produto) {
        valorTotal += produto.value;
    }
    
    
    return {
        getRestauranteName: function() {
            return nomeRestaurante;
        },
        
        getCardapio: function() {
            return cardapio;
        },
    
        getItemCardapio: function(itemId) {
            return cardapio[itemId];
        },
        
        getPedido: function() {
            return pedido;
        },
        
        addToPedido: function(produto) {
            if(produto){
                produto.date = Date.now();
                pedido.push(angular.copy(produto));
                soma(produto);
            }
            else{
                return false;
            }
        },
        
        remFromPedido: function(produto) {
            if(produto){
                var produtoId = pedido.indexOf(produto);
                pedido.splice(produtoId, 1);
                valorTotal -= produto.value;
            }
        },
        
        getValorTotal: function() {
            return valorTotal;
        } 
    }
    
});

 */