jQuery(document).ready(function($){
    $('.datetimepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
    });

    $('#send').on('click', function(){
        var vUrl = "../../functions/search.php";
        var vData = {origem: $('#flight-origin-hp-flight').val(),
                    destino: $('#flight-destination-hp-flight').val(),
                    ida: $('#flight-departing-hp-flight').val(),
                    volta: $('#flight-departing-hp-flight').val(),
                    adultos: $('#flight-adults-hp-flight').val(),
                    criancas:$('#flight-children-hp-flight').val()};

        $.ajax({
            url: vUrl,
            type: 'post',
            data: vData,
            success: function(data) {
                var obj = $.parseJSON(data);
                var index = [];
                var html = '';
                $.each(obj.content.legs, function(i, item) {
                    // oItem = $.parseJSON(item);
                    if(item.identity.index in index) {
                        alert(item.identity.index);
                    }else{
                        html += '<tr>';
                        html += '<td>' + item.carrierSummary.airlineName + '</td>';
                        html += '<td></td>';
                        html += '<td></td>';
                        html += '<td>' + item.duration.hours + ':' + item.duration.minutes + '</td>';
                        html += '<td>' + item.departureLocation.airportCode + ' - ' + item.arrivalLocation.airportCode + '</td>';
                        html += '<td>' + item.price.formattedPrice + '</td>';
                        html += '</tr>';
                        index.push(item.identity.index);
                    }
                    console.log(item.identity.index);
                    console.log(index);
                    console.log('-------------------');
                });

                $('.dados').append(html);
            }
        });

    });
});