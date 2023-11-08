jQuery(function ($) {

//	if ($('form').length) {
//		var api_key,
//			locations;
//
//		$('#api_key').on('input paste', function () {
//			api_key = $(this).val();
//
//			locations.remote.url = 'https://api.bodygraphchart.com/v210502/locations?query=%QUERY&api_key=' + api_key;
//		});
//
//		// Generate years dropdown
//		var select = $('#year'),
//			thisYear = new Date().getFullYear();
//
//		for (var i = 0; i <= 100; i++) {
//			var year = thisYear - i;
//
//			$('<option>', { value: year, text: year }).appendTo(select);
//		}
//
//		// Generate months dropdown
//		var select = $('#month');
//
//		for (var i = 1; i <= 12; i++) {
//			var value = ('0' + i).slice(-2);
//
//			$('<option>', { value: value, text: value }).appendTo(select);
//		}
//
//		// Generate days dropdown
//		var select = $('#day');
//
//		for (var i = 1; i <= 31; i++) {
//			var value = ('0' + i).slice(-2);
//
//			$('<option>', { value: value, text: value }).appendTo(select);
//		}
//
//		// Generate hours dropdown
//		var select = $('#hour');
//
//		for (var i = 0; i <= 23; i++) {
//			var value = ('0' + i).slice(-2);
//
//			$('<option>', { value: value, text: value }).appendTo(select);
//		}
//
//		// Generate minutes dropdown
//		var select = $('#minutes');
//
//		for (var i = 0; i <= 59; i++) {
//			var value = ('0' + i).slice(-2);
//
//			$('<option>', { value: value, text: value }).appendTo(select);
//		}
//
//		$('#year, #month, #day, #hour, #minutes').selectize();
//
//		locations = new Bloodhound({
//			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
//			queryTokenizer: Bloodhound.tokenizers.whitespace,
//			remote: {
//				url: 'https://api.bodygraphchart.com/v210502/locations?query=%QUERY',
//				wildcard: '%QUERY'
//			},
//			limit: 10
//		});
//
//		locations.initialize();
//
//		$('#location').typeahead({
//			hint: true,
//			highlight: true,
//			minLength: 2
//		}, {
//			name: 'city',
//			displayKey: 'value',
//			source: locations.ttAdapter(),
//			limit: 20,
//			templates: {
//				empty: function (ctx) {
//					var encodedStr = ctx.query.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
//						return '&#' + i.charCodeAt(0) + ';';
//					});
//
//					return '<div class="tt-suggestion">Sorry, no location names match <b>' + encodedStr + '</b>.</div>';
//				},
//				suggestion: function (ctx) {
//					var country = ctx.country || '',
//
//					s = '<p><strong>' + ctx.asciiname + '</strong>';
//
//					if (country && typeof ctx.admin1 === 'string' && ctx.admin1.length > 0 && ctx.admin1.indexOf(ctx.asciiname) != 0) {
//						country = ctx.admin1 + ', ' + country;
//					}
//
//					if (country) {
//						country = ' - <small>' + country + '</small>';
//					}
//
//					return s + country + '</p>';
//				}
//			}
//		});
//
//		$('#location').on('typeahead:selected', function (evt, item) {
//			$('#timezone').val(item.timezone);
//		});
//
//		var form = $('form');
//
//		form.on('submit', function (evt) {
//			evt.preventDefault();
//
//			form.addClass('loading')
//				.parent()
//				.find('.error-message')
//				.remove();
//
//			var date = $('#year').val() + '-' + $('#month').val() + '-' + $('#day').val() + ' ' + $('#hour').val() + ':' + $('#minutes').val(),
//				timezone = $('#timezone').val();
//
//	
//		});
//	}

	
	$.get('https://api.bodygraphchart.com/v221006/hd-data?api_key=75849819-e1e1-41a5-a046-c1bbaf75eca9&date[0]=2019-05-05%2010:10&timezone[0]=Europe/London&date[1]=2009-01-15%2015:15&timezone[1]=Europe/London&relationship=1', function (data) {
	
		if (data['0'].Properties) {
			if (data['0']) {
				var data = data['0']

				for (const [key, value] of Object.entries(data.Design)) {
					$('.design').append(`
				<li>
					<span class="wb-${key.replace(' ', '-')}"></span>
					${value.Gate}.${value.Line}
				</li>
			`);
				}

				for (const [key, value] of Object.entries(data.Personality)) {
					$('.personality').append(`
				<li>
					<span class="wb-${key.replace(' ', '-')}"></span>
					${value.Gate}.${value.Line}
				</li>
			`);
				}

				$('text').each(function () {
					var el = jQuery(this)
				.prev();

					var gateNumber = el.attr('id');

					if (hasGate(data, gateNumber)) {
						el.css('fill', '#000000');

						el.next()
					.css('fill', '#FFFFFF');
					}
				});

				$('[id^=design-], [id^=personality-]') .each(function () {
					var el = $(this);

					var gateNumber = el.attr('id')
				.split('-')[1];

					var designValues = Object.values(data.Design),
						personalityValues = Object.values(data.Personality);

					var designGate = null;

					for (var key in designValues) {
						if (designValues[key].Gate == gateNumber) {
							designGate = true;
						}
					}

					var personalityGate = null;

					for (var key in personalityValues) {
						if (personalityValues[key].Gate == gateNumber) {
							personalityGate = true;
						}
					}

					if (designGate != null && personalityGate != null) {
						$(`#design-${gateNumber}`)
					.css('fill', '#4e4e4e');

						$(`#personality-${gateNumber}`)
					.css('fill', '#d0b171');

						fixLine(el);
					} else if (designGate != null) {
						el.css('fill', '#4e4e4e');

						fixLine(el);
					} else if (personalityGate != null) {
						el.css('fill', '#d0b171');

						fixLine(el);
					}
				});

				for (var definedCenter in data['DefinedCenters']) {
					var el = $(`#${data['DefinedCenters'][definedCenter].replace(/\s+/g, '-').toLowerCase()}`);

					if (el.length) {
						el.attr('fill', '#BFA161');
					}
				}

				if (data.Variables['Digestion'] == 'right') {
					$('#variable-digestion')
				.removeClass('wb-left')
				.addClass('wb-right');
				}

				if (data.Variables['Environment'] == 'right') {
					$('#variable-environment')
				.removeClass('wb-left')
				.addClass('wb-right');
				}

				if (data.Variables['Awareness'] == 'right') {
					$('#variable-awareness')
				.removeClass('wb-left')
				.addClass('wb-right');
				}

				if (data.Variables['Perspective'] == 'right') {
					$('#variable-perspective')
				.removeClass('wb-left')
				.addClass('wb-right');
				}

				$('#chart-properties ul').append(`
			<li>
				<strong>Birth Date Local:</strong> ${data.Properties['BirthDateLocal']}
			</li>
		`);

				$('#chart-properties ul').append(`
			<li>
				<strong>Type:</strong> ${data.Properties['Type']}
			</li>
		`);

				$('#chart-properties ul').append(`
			<li>
				<strong>Strategy:</strong> ${data.Properties['Strategy']}
			</li>
		`);

				$('#chart-properties ul').append(`
			<li>
				<strong>Inner Authority:</strong> ${data.Properties['InnerAuthority']}
			</li>
		`);

				$('#chart-properties ul').append(`
			<li>
				<strong>Signature:</strong> ${data.Properties['Signature']}
			</li>
		`);

				$('#chart-properties ul').append(`
			<li>
				<strong>Not Self Theme:</strong> ${data.Properties['NotSelfTheme']}
			</li>
		`);

				$('#chart-properties ul').append(`
			<li>
				<strong>Definition:</strong> ${data.Properties['Definition']}
			</li>
		`);

				$('#chart-properties ul').append(`
			<li>
				<strong>Profile:</strong> ${data.Properties['Profile']}
			</li>
		`);

				$('#chart-properties ul').append(`
			<li>
				<strong>Digestion:</strong> ${data.Properties['Digestion']}
			</li>
		`);

				$('#chart-properties ul').append(`
			<li>
				<strong>Environment:</strong> ${data.Properties['Environment']}
			</li>
		`);

				$('#chart-properties ul').append(`
			<li>
				<strong>Sense:</strong> ${data.Properties['Sense']}
			</li>
		`);

				$('#chart-properties ul').append(`
			<li>
				<strong>Incarnation Cross:</strong> ${data.Properties['IncarnationCross']}
			</li>
		`);

				$('[data-tooltip]').hover(function (evt) {
					$(`<div class="hd-tooltip">${$(this).data('tooltip')}</div>`).offset({ top: evt.clientY, left: evt.clientX })
				.appendTo(document.body);
					}, function () {
					$('.hd-tooltip').remove();
				});
			}
		}
	})
				.fail(function () {
					$('<div class="error-message">Oops. Something went wrong. Please try again later.</div>').insertBefore(form);
				})

});

function hasGate(data, gateNumber) {
	var design = Object.values(data.Design);

	for (var key in design) {
		if (design[key].Gate == gateNumber) {
			return true;
		}
	}

	var personality = Object.values(data.Personality);

	for (var key in personality) {
		if (personality[key].Gate == gateNumber) {
			return true;
		}
	}

	return false;
}

function fixLine(el) {
	var parent = el.parent();

	if (parent.attr('id') == '20-57-10-34-20-34-10-57') {
		el.show();
	}
}
