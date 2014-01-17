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

	function range(min, max) {
		var sequence = [];
		var reverse = (min > max);
		if (reverse) {
			for (var i = min; i > max; i--) {
				sequence.push(i);
			}
		} else {
			for (var i = min; i < max; i++) {
				sequence.push(i);
			}
		}
		return sequence;
	}

	function getGraftingNumbers(limit) {
		display(range(0, limit).filter(isGraftingNumber));
	}

	function isGraftingNumber(number) {
		var rootDigits = Math.sqrt(number).toFixed(PRECISION).replace('.', '');
		var numberDigits = number.toFixed(0);
		return (rootDigits.indexOf(numberDigits) !== -1);
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
		},
		range : range,
		isGraftingNumber : isGraftingNumber,
		display : display
	};
}());
grafting.setSizeField(document.getElementById('size'));
grafting.setStartButton(document.getElementById('start'));
grafting.setResultsList(document.getElementById('results'));
