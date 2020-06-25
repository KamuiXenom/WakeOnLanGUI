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
						row.attr('data-mac', item.mac);
						row.find('td.wol-action > a').bind('click', function( e ) {
							e.preventDefault();

							$.ajax({
								method: "GET",
								dataType: "json",
								data: { action: 'wake', mac: row.attr('data-mac') },
								url: "wol.php",

								success: function( data, textStatus, jqXHR ) {

									if ( typeof data.result != 'undefined') {

										alert(data.result + ': ' + data.message);

									} else {

										if ( typeof data.error != 'undefined') {
											alert(data.error);
										} else {
											alert('Unbekannter Fehler');
										}

									}

								}
							});

						});
						row.find('td.wol-name').text(item.name);
						row.find('td.wol-mac').text(item.mac);
						row.show();

					tbody.append(row);
				});

			} else {

				if ( typeof data.error != 'undefined') {
					alert(data.error);
				} else {
					alert('Unbekannter Fehler');
				}

			}

		}

	});

});
