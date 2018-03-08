<?php
/**
 * Created by PhpStorm.
 * User: kelver
 * Date: 06/03/18
 * Time: 03:26
 */
set_time_limit(240);
ini_set('max_execution_time', 240);
ini_set('display_errors',1);
ini_set('display_startup_erros',1);
error_reporting(E_ALL);
if($_POST) {
	$origem         = $_POST['origem'];
	$destino        = $_POST['destino'];
	$ida            = urlencode($_POST['ida']);
	$volta          = urlencode($_POST['volta']);
	$adultos        = $_POST['adultos'];
	$criancas       = $_POST['criancas'];
	$companhias     = ['AZUL', 'AVIANCA', 'GOL'];
	$output         = [];
	$response_code  = [];
	
	$ch = curl_init();
	
	$queryString = array(
		'TipoBusca'                 => '1',
		'Bebes'                     => '0',
		'Criancas'                  => $criancas,
		'Adultos'                   => $adultos,
		'TipoViagem'                => 1,
		'Trechos[0][Destino]'       => $destino,
		'Trechos[0][Origem]'        => $origem,
		'Trechos[0][DataIda]'       => $ida,
		'Trechos[1][Destino]'       => $destino,
		'Trechos[1][Origem]'        => $origem,
		'Trechos[1][DataIda]'       => $volta,
	);
//echo "https://apinode.voesimples.com.br:3000/busca?Companhias[]=AZUL&TipoBusca=1&Bebes=0&Criancas={$criancas}&Adultos={$adultos}&TipoViagem=1&Trechos[0][Destino]={$destino}&Trechos[0][Origem]={$origem}&Trechos[0][DataIda]={$ida}&Trechos[1][Destino]={$origem}&Trechos[1][Origem]={$destino}&Trechos[1][DataIda]={$volta}";
	foreach ($companhias as $companhia) {
		// informar URL e outras funções ao CURL
		curl_setopt( $ch, CURLOPT_URL, "https://apinode.voesimples.com.br:3000/busca?Companhias[]={$companhia}&TipoBusca=1&Bebes=0&Criancas={$criancas}&Adultos={$adultos}&TipoViagem=1&Trechos[0][Destino]={$destino}&Trechos[0][Origem]={$origem}&Trechos[0][DataIda]={$ida}&Trechos[1][Destino]={$origem}&Trechos[1][Origem]={$destino}&Trechos[1][DataIda]={$volta}" );
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
		// acessar URL
//	$output = curl_exec( $ch );
		array_push( $output, json_decode(curl_exec( $ch ) ));
		array_push( $response_code, curl_getinfo( $ch, CURLINFO_HTTP_CODE ) );
	}
		echo json_encode($output);
}




















