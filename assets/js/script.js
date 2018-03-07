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
                $.each(obj.content.offers, function(i, item) {
                    var ida = item.legIds[0];
                    var volta = item.legIds[1];

                    var airportCodeOrigem = item.naturalKey.split('-coach-', 2);
                    var airportCodeOrigem = airportCodeOrigem['1'].split('-', 1);

                    var airportCodeChegada = item.naturalKey.split(';', 2);
                    airportCodeChegada = airportCodeChegada[1].split('-coach-', 2);
                    airportCodeChegada = airportCodeChegada[1].split('-', 1);

                    console.log(ida + ' - ' + volta);
                    $.each(obj.content.legs, function(i, ob) {
                        if((ida == ob.identity.naturalKey) && (ob.departureLocation.airportCode == airportCodeOrigem[0].toUpperCase())) {
                            html += '<tr><td class="view-message"><b>Ida</b></td>';
                            html += '<td class="view-message">' + ob.carrierSummary.airlineName +'</td>';
                            html += '<td class="view-message">' + ob.departureTime.time + ' - ' + ob.arrivalTime.time + '</td>';
                            html += '<td class="view-message">Duração: ' + ob.duration.hours + ':' + ob.duration.minutes + '</td>';
                            html += '<td class="view-message">' + ob.departureLocation.airportCode + ' - ' + ob.arrivalLocation.airportCode + '</td>';
                            html += '</tr>';
                        }else
                        if((volta == ob.identity.naturalKey) && (ob.departureLocation.airportCode == airportCodeChegada[0].toUpperCase())) {
                            html += '<tr><td class="view-message"><b>Volta</b></td>';
                            html += '<td class="view-message">' + ob.carrierSummary.airlineName +'</td>';
                            html += '<td class="view-message">' + ob.departureTime.time + ' - ' + ob.arrivalTime.time + '</td>';
                            html += '<td class="view-message">Duração: ' + ob.duration.hours + ':' + ob.duration.minutes + '</td>';
                            html += '<td class="view-message">' + ob.departureLocation.airportCode + ' - ' + ob.arrivalLocation.airportCode + '</td>';
                            html += '<td class="view-message" rowspan="2" align="center">Preço<br>' + ob.price.formattedPrice + '</td>';
                            html += '</tr>';
                        }
                    });
                });

                $('.dados').append(html);

            }
        });

    });
});