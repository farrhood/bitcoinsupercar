const app = new Vue({
    el: '#appwrapper',
    data: {
        etheurPrice: "",
        ethusdPrice: "",
        ethlamboPrice: "",
        lamboPrice: "",
        enteredEth: ""
    },
    created: function () {
        this.getCurrentEthEurPrice();
        var updatePrice = setInterval(this.getCurrentEthEurPrice, 10000);
    },
    computed: {
      ethLamboCalc: function () {
          if(isNaN(this.enteredEth) || this.enteredEth === "") {
              return "Amount ETH";
          }
          return this.enteredEth + " ETH = " + this.enteredEth * this.ethlamboPrice + " Lambo";
      }
    },
    methods: {
        getCurrentEthEurPrice: function () {
            var self = this;
            $.ajax({
                url: '/api/index'
            }).done(function (data) {
                self.etheurPrice = data['etherEurPrice'][0];
                self.ethusdPrice = data['etherUsdPrice'][0];
                self.ethlamboPrice = data['etherEurPrice'][0] / data['products'][0]['eurPrice'];
                self.lamboPrice = data['products'][0]['eurPrice'] / data['etherEurPrice'][0];
            });
        }
    }
});

window.addEventListener("load",function() {
    // Set a timeout...
    setTimeout(function(){
        // Hide the address bar!
        window.scrollTo(0, 1);
    }, 0);
});