<?php
/**
 * WakeOnLanGUI
 *
 * @author Nico Panke <webmaster@kamuixenom.de>
 * @copyright copyright (c) 2011 - 2020 Nico Panke
 *
 * @file index.php
 * @date 2020/06/25
 */

define('COMPUTER_CSV_PATH', 'data/computer.csv');
define('NETWORK_BROADCAST', '255.255.255.255');

# GET[action]:
#  - list
#  - wake +GET[mac]

if ( isset($_GET['action']) ) {
	include_once 'vendor/autoload.php';

	switch ($_GET['action']) {

		case 'list':

			try {

				$csv_content = file_get_contents(COMPUTER_CSV_PATH);

				if ( empty($csv_content) ) {
					throw new Exception('csv content is empty');
				}

			} catch ( \Exception $e ) {
				echo json_encode([
					"error" => $e->getMessage()
				]);
			}

			try {

				$csv = new \CSVReader\CSVReader();

				echo json_encode([
					'list' => $csv->setHeader(['name', 'mac'])->load($csv_content)
				]);

			} catch ( \Exception $e ) {
				echo json_encode([
					"error" => $e->getMessage()
				]);
			}


			break;


		case 'wake':

			try {

				if ( !isset($_GET['mac']) ) {
					throw new \InvalidArgumentException('missing mac');
				}

				$pwol = new \Diegonz\PHPWakeOnLan\PHPWakeOnLan(NETWORK_BROADCAST, 9);
				$result = $pwol->wake([$_GET['mac']]);

				echo json_encode($result);

			} catch ( \Exception $e ) {
				echo json_encode([
					"error" => $e->getMessage()
				]);
			}

			break;

	}

} else {
	echo json_encode([
		"error" => "No Action defined"
	]);
}

