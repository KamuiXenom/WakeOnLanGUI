/*
 * WakeOnLanGUI
 *
 * @author Nico Panke <webmaster@kamuixenom.de>
 * @copyright copyright (c) 2011 - 2020 Nico Panke
 *
 * @file wol.js
 * @date 2020/06/25
 */

$(document).ready(function() {
	
	let table = $('table#wol');
	let tbody = $(table).find('tbody');
	let brow = $(tbody).find('tr.wol-row-base').hide();
	let modal = $('div#wol-alert-modal');

	/**
	 * alert
	 *
	 * @param message
	 */
	function wolAlert( message ) {

		modal.find('h5.modal-title').text('Alert');
		modal.find('div.modal-body > p').text(message);
		modal.modal('show');

	}

	/**
	 * info
	 *
	 * @param message
	 */
	function wolInfo( message ) {

		modal.find('h5.modal-title').text('Info');
		modal.find('div.modal-body > p').text(message);
		modal.modal('show');

	}

	/**
	 * wake event
	 *
	 * @param e
	 */
	function wakeEvent( e ) {
		e.preventDefault();

		$.ajax({
			method: "GET",
			dataType: "json",
			data: { action: 'wake', mac: e.data.mac },
			url: "wol.php",

			success: function( data, textStatus, jqXHR ) {

				if ( typeof data.result != 'undefined') {
					wolInfo(data.result + ': ' + data.message);
				} else {

					if ( typeof data.error != 'undefined') {
						wolAlert(data.error);
					} else {
						wolAlert('Unbekannter Fehler');
					}

				}

			}
		});
	}

	/**
	 * ping event
	 *
	 * @param e
	 */
	function pingEvent( e ) {
		e.preventDefault();

		$.ajax({
			method: "GET",
			dataType: "json",
			data: { action: 'ping', host: e.data.ip },
			url: "wol.php",

			success: function( data, textStatus, jqXHR ) {

				if ( typeof data.online != 'undefined') {
					wolInfo('Online: '+(data.online?'yes':'no'));
				} else {

					if ( typeof data.error != 'undefined') {
						wolAlert(data.error);
					} else {
						wolAlert('Unbekannter Fehler');
					}

				}

			}
		});
	}

	/**
	 * show list of computers
	 */
	function showList() {

		$(tbody).find('.wol-row-item').remove();

		$.ajax({
			method: "GET",
			dataType: "json",
			data: { action: 'list' },
			url: "wol.php",

			success: function( data, textStatus, jqXHR ) {

				if ( typeof data.list != 'undefined') {

					$.each(data.list, function( index, item ){

						let row = $(brow).clone();
						row.removeClass('wol-row-base');
						row.removeClass('hide');
						row.addClass('wol-row-item');
						row.attr('data-mac', item.mac);
						row.attr('data-ip', item.ip);
						row.find('td.wol-action > a.wol-action-wake').bind('click', {mac: item.mac}, wakeEvent);
						row.find('td.wol-action > a.wol-action-ping').bind('click', {ip: item.ip}, pingEvent);
						row.find('td.wol-name').text(item.name);
						row.find('td.wol-mac').text(item.mac);
						row.find('td.wol-ip').text(item.ip);
						row.show();

						tbody.append(row);
					});

				} else {

					if ( typeof data.error != 'undefined') {
						wolAlert(data.error);
					} else {
						wolAlert('Unbekannter Fehler');
					}

				}

			}

		});

	}

	showList();
	$('a#wol-list-refresh').bind('click', function (e) {
		e.preventDefault();

		showList();
	});

});
