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
            beforeSend: function(){
                $('.box').css('display', 'block');
            },
            success: function(data) {
                var obj = $.parseJSON(data);
                var index = [];
                $.each(obj.content.offers, function(i, item) {
                    var ida = item.legIds[0];
                    var volta = item.legIds[1];

                    var airportCodeOrigem = item.naturalKey.split('-coach-', 2);
                    var airportCodeOrigem = airportCodeOrigem['1'].split('-', 1);

                    var airportCodeChegada = item.naturalKey.split(';', 2);
                    airportCodeChegada = airportCodeChegada[1].split('-coach-', 2);
                    airportCodeChegada = airportCodeChegada[1].split('-', 1);

                    $.each(obj.content.legs, function(i, ob) {
                        var html = '';
                        if((ida == ob.identity.naturalKey) && (ob.departureLocation.airportCode == airportCodeOrigem[0].toUpperCase())) {
                            html += '<tr><td class="view-message"><b>Ida</b></td>';
                            html += '<td class="view-message">' + ob.carrierSummary.airlineName +'</td>';
                            html += '<td class="view-message">' + ob.departureTime.time + ' - ' + ob.arrivalTime.time + '</td>';
                            html += '<td class="view-message">Duração: ' + ob.duration.hours + ':' + ob.duration.minutes + '</td>';
                            html += '<td class="view-message">' + ob.departureLocation.airportCode + ' - ' + ob.arrivalLocation.airportCode + '</td>';
                            html += '<td class="view-message" rowspan="2" align="center"><b>Preço</b><br>' + ob.price.formattedPrice + '</td>';
                            html += '</tr>';
                            html += '<tr id="volta' + volta + '"></tr>';
                            $('.dados').append(html);
                        }
                    });
                    $.each(obj.content.legs, function(i, obV) {
                        var htmlV = '';
                        if((volta == obV.identity.naturalKey) && (obV.departureLocation.airportCode == airportCodeChegada[0].toUpperCase())) {
                            htmlV += '<td class="view-message"><b>Volta</b></td>';
                            htmlV += '<td class="view-message">' + obV.carrierSummary.airlineName +'</td>';
                            htmlV += '<td class="view-message">' + obV.departureTime.time + ' - ' + obV.arrivalTime.time + '</td>';
                            htmlV += '<td class="view-message">Duração: ' + obV.duration.hours + ':' + obV.duration.minutes + '</td>';
                            htmlV += '<td class="view-message">' + obV.departureLocation.airportCode + ' - ' + obV.arrivalLocation.airportCode + '</td>';

                            $('#volta'+volta).append(htmlV);
                            $('#volta'+volta).attr('id', 'volta'+volta+'ok');
                            console.log(htmlV);
                        }
                    });
                });
            },
            complete: function(){
                $('.box').css('display', 'none');
            },
        });

    });
});