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
                $('.tituloSentido').css('display', 'none');
                $('.dadosIda .dadosVolta').empty();
            },
            success: function(data) {
                var obj = $.parseJSON(data);
                $.each(obj, function(i, item) {
                    $.each(item.Trechos, function(i, it) {
                        $.each(it.Voos, function(i, v) {
                            var html = '';
                            if(v.Sentido == 'Ida') {
                                var horaEm = v.Embarque.split(' ');
                                var horaDe = v.Desembarque.split(' ');

                                html += '<tr style="margin: 5px 0;">';
                                html += '<td class="view-message" style="line-height: 75px;">' + v.Companhia + '</td>';
                                html += '<td class="view-message" style="line-height: 75px;">' + horaEm[1] + ' - ' + horaDe[1] + '</td>';
                                html += '<td class="view-message" style="line-height: 75px;">Duração: ' + v.Duracao + '</td>';
                                html += '<td class="view-message" style="line-height: 75px;">' + v.Origem + ' - ' + v.Destino + '</td>';
                                html += '<td align="center">';
                                html += '<table class="table"><tr><td><b>Preço</b><br>' + v.Valor.Total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"} + '</td>';
                                html += '<td><b>Milhas</b><br>' + v.Milhas.Total.toLocaleString("pt-BR");
                                +'</td></tr></table>';
                                html += '</td></tr>';
                                $('.dadosIda').append(html);
                            }
                        });
                        $.each(it.Voos, function(i, vt) {
                            var htmlv = '';
                            if(vt.Sentido == 'Volta') {
                                var horaEm = vt.Embarque.split(' ');
                                var horaDe = vt.Desembarque.split(' ');

                                htmlv += '<tr style="margin: 5px 0;">';
                                htmlv += '<td class="view-message" style="line-height: 75px;">' + vt.Companhia + '</td>';
                                htmlv += '<td class="view-message" style="line-height: 75px;">' + horaEm[1] + ' - ' + horaDe[1] + '</td>';
                                htmlv += '<td class="view-message" style="line-height: 75px;">Duração: ' + vt.Duracao + '</td>';
                                htmlv += '<td class="view-message" style="line-height: 75px;">' + vt.Origem + ' - ' + vt.Destino + '</td>';
                                htmlv += '<td align="center">';
                                htmlv += '<table class="table"><tr><td><b>Preço</b><br>' + vt.Valor.Total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) + '</td>';
                                htmlv += '<td><b>Milhas</b><br>' + vt.Milhas.Total.toLocaleString("pt-BR");
                                +'</td></tr></table>';
                                htmlv += '</td></tr>';
                                $('.dadosVolta').append(htmlv);
                            }
                        });
                    });
                });
            },
            complete: function(){
                $('.box').css('display', 'none');
                $('.tituloSentido').css('display', 'block');
            },
        });

    });
});