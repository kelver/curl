<?php
/**
 * Created by PhpStorm.
 * User: kelver
 * Date: 06/03/18
 * Time: 03:26
 */

//ini_set('display_errors',1);
//ini_set('display_startup_erros',1);
//error_reporting(E_ALL);
if($_POST) {
	$origem   = $_POST['origem'];
	$destino  = $_POST['destino'];
	$ida      = $_POST['ida'];
	$volta    = $_POST['volta'];
	$adultos  = $_POST['adultos'];
	$criancas = $_POST['criancas'];

//https://www.expedia.com.br/Flights-Search?langid=1033&trip=roundtrip&leg1=from:Cuiabá, Brasil (CGQB-Aeroporto Internacional Marechal Rondon),to:Campo Grande, Brasil (CGR-Aeroporto Internacional de Campo Grande),departure:20/03/2018TANYT&leg2=from:Campo Grande, Brasil (CGR-Aeroporto Internacional de Campo Grande),to:Cuiabá, Brasil (CGB-Aeroporto Internacional Marechal Rondon),departure:27/03/2018TANYT&passengers=children:0,adults:1,seniors:0,infantinlap:N&options=cabinclass:economy,sortby:price,carrier:AV&mode=search&paandi=true
	
	$ch = curl_init();
	
	$queryString = array(
		'langid'     => '1033',
		'trip'       => 'roundtrip',
		'leg1'       => "from:{$origem},to:{$destino},departure:{$ida}TANYT",
		'leg2'       => "from:{$destino},to:{$origem},departure:{$volta}TANYT",
		'passengers' => "children:{$criancas},adults:{$adultos},seniors:0,infantinlap:N",
		'options'    => "cabinclass:economy,sortby:price,carrier:AV",
		'mode'       => 'search',
		'paandi'     => 'true',
	);

// informar URL e outras funções ao CURL
	curl_setopt( $ch, CURLOPT_URL, "https://www.expedia.com.br/Flights-Search?" . http_build_query( $queryString ) );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

// acessar URL
	$output = curl_exec( $ch );
// Pegar o código de resposta
	$response_code = curl_getinfo( $ch, CURLINFO_HTTP_CODE );

// Not found?
	if ( $response_code == '404' ) {
		echo 'Página não existente';
	} else {
		$part    = explode( "/Flight-Search-Paging", $output );
		$urlJson = explode( "'", $part[1] );
		$json    = file_get_contents( 'https://www.expedia.com.br/Flight-Search-Paging' . $urlJson[0] );
		echo $json;
	}
}




















