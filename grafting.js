/* Grafting
 * 2013 Jean-Karim Bockstael <jkb@jkbockstael.be>
 *
 * A toy to find and display grafting numbers, as defined by Matt Parker.
 * See the Numberphile video at http://www.youtube.com/watch?v=hiOMtBrH8pc for info.
 */

var grafting = (function() {
	const PRECISION = 20;
	var dom = {
		size : undefined,
		start : undefined,
		results : undefined
	};

	function getGraftingNumbers(limit) {
		var results = [];
		for (var i = 0; i < limit; i++) {
			if (isGraftingNumber(i)) {
				results.push(i);
			}
		}
		display(results);
	}

	function isGraftingNumber(number) {
		var root = Math.sqrt(number).toFixed(PRECISION);
		var rootDigits = root.replace('.', '');
		var numberDigits = number.toFixed(0);
		var decimalPointPosition = root.indexOf('.');
		var matchPosition = rootDigits.indexOf(numberDigits);
		return (matchPosition !== -1 && decimalPointPosition >= matchPosition);
	}

	function format(number) {
		var root = Math.sqrt(number).toFixed(PRECISION);
		var rootDigits = root.replace('.', '');
		var numberDigits = number.toFixed(0);
		var highlightPosition = rootDigits.indexOf(numberDigits);
		var highlightLength = numberDigits.length;
		var decimalPointPosition = root.indexOf('.');
		if (decimalPointPosition > highlightPosition && decimalPointPosition < highlightPosition + highlightLength) {
			highlightLength = highlightLength + 1;
		}
		if (decimalPointPosition <= highlightPosition) {
			highlightPosition = highlightPosition + 1;
		}
		return '<b>' + numberDigits + '</b> - ' + root.slice(0, highlightPosition) + '<b>' + 
				root.slice(highlightPosition, highlightPosition + highlightLength) + '</b>' + 
				root.slice(highlightPosition + highlightLength);
	}

	function display(results) {
		while (dom.results.hasChildNodes()) {
			dom.results.removeChild(dom.results.firstChild);
		}
		dom.results.innerHTML = '<li>' + results.map(format).join('</li><li>') + '</li>';
	}

	return {
		setSizeField : function(elem) {
			dom.size = elem;
			dom.size.value = 100;
		},
		setStartButton : function(elem) {
			dom.start = elem;
			dom.start.addEventListener('click', function() {
				getGraftingNumbers(dom.size.value);
			});
		},
		setResultsList : function(elem) {
			dom.results = elem;
		}
	};
}());
grafting.setSizeField(document.getElementById('size'));
grafting.setStartButton(document.getElementById('start'));
grafting.setResultsList(document.getElementById('results'));
