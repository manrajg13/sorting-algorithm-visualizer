import {getSpeed, getArray, getColors} from './canvas.js';

let shuffling = false;

function sleep (chart) {
	chart.update();
	let ms = getSpeed();
	return new Promise(resolve => setTimeout(resolve, ms));
}

function colorStep(step) {
	for (let i = 1; i < 12; i++) {
		document.getElementById("step" + i.toString()).style.backgroundColor = "#02040f";
    	document.getElementById("step" + i.toString()).style.color = "white";
	}

	document.getElementById("step" + step).style.backgroundColor = "white";
    document.getElementById("step" + step).style.color = "#02040f";
}

async function colorBar(chart, i, color, mode) {
	let colors = getColors();
	colors[i] = color;
	if (mode) {
		await sleep(chart);
		colors[i] = 'white';
	}
}

async function swap (chart, i, j) {
	let array = getArray();
	let temp = array[i];

	array[i] = array[j];
	array[j] = temp;

	let speed = getSpeed();
	chart.options.animation.duration = speed/2 + 30;

	if (!shuffling) {
		colorBar(chart, i, '#ffb326', 1);
		colorBar(chart, j, '#ffb326', 1);
	}
}

function shuffle(chart) {
	var i, j, x;
	shuffling = true;
	let array = getArray();

	for(i = array.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		swap(chart, i, j);
	}

	chart.update();
	shuffling = false;
}

function growDiv() {
    let growDiv = document.getElementById('steps-container');
    if (growDiv.clientHeight) {
    	growDiv.style.height = 0;
    } else {
    	let wrapper = growDiv.querySelector('.measuringWrapper');
      	growDiv.style.height = wrapper.clientHeight + 15 + "px";
    }
}

async function setSort() {
	let selection = document.getElementById('algorithm-select');
	document.getElementById('algorithm-name').innerHTML = selection.options[selection.selectedIndex].text;
	
	let growDiv = document.getElementById('steps-container');
	let wrapper = growDiv.querySelector('.measuringWrapper');

	switch(selection.value) {
		case "bogoSort":
			document.getElementById('step1').innerHTML = '\u2003bogoSort(array):<br>';
			document.getElementById('step2').innerHTML = '\u2003\u2003\u2003while sorted = false:<br>' + 
														 '\u2003\u2003\u2003\u2003\u2003shuffle array';
			document.getElementById('step3').innerHTML = '\u2003\u2003\u2003\u2003\u2003if array is sorted:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003\u2003\u2003sorted := true<br>' +
														 '\u2003\u2003\u2003\u2003\u2003\u2003\u2003break';
			document.getElementById('step4').innerHTML = '\u2003\u2003\u2003\u2003\u2003else:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003\u2003\u2003sorted := false';
			for (let i = 5; i < 12; i++) {
				document.getElementById("step" + i.toString()).innerHTML = '';
			}
      		if (growDiv.clientHeight) {
      			growDiv.style.height = wrapper.clientHeight + 15 + "px";
      		}
			break;
		case "bubbleSort":
			document.getElementById('step1').innerHTML = '\u2003bubbleSort (array):<br>';
			document.getElementById('step2').innerHTML = '\u2003\u2003\u2003for i := 0 to array.length:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003swapped = false';
			document.getElementById('step3').innerHTML = '\u2003\u2003\u2003\u2003\u2003for j := 0 to array.length - i - 1:';
			document.getElementById('step4').innerHTML = '\u2003\u2003\u2003\u2003\u2003\u2003\u2003if array[j] > array[j+1]:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003swap (array[j], array[j+1])<br>' +
														 '\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003swapped = true';
			document.getElementById('step5').innerHTML = '\u2003\u2003\u2003\u2003\u2003if swapped = false:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003\u2003\u2003break';
			for (let i = 6; i < 12; i++) {
				document.getElementById("step" + i.toString()).innerHTML = '';
			}
			if (growDiv.clientHeight) {
      			growDiv.style.height = wrapper.clientHeight + 15 + "px";
      		}
			break;
		case "selectionSort":
			document.getElementById('step1').innerHTML = '\u2003selectionSort (array):<br>' ;
			document.getElementById('step2').innerHTML = '\u2003\u2003\u2003for i := 0 to array.length:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003min = i';
			document.getElementById('step3').innerHTML = '\u2003\u2003\u2003\u2003\u2003for j := i + 1 to array.length:';
			document.getElementById('step4').innerHTML = '\u2003\u2003\u2003\u2003\u2003\u2003\u2003if array[j] < min:<br>' + 
														 '\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003min = j';
			document.getElementById('step5').innerHTML = '\u2003\u2003\u2003\u2003\u2003if min != i:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003\u2003\u2003swap (array[i], array[min])';
			for (let i = 6; i < 12; i++) {
				document.getElementById("step" + i.toString()).innerHTML = '';
			}
			if (growDiv.clientHeight) {
      			growDiv.style.height = wrapper.clientHeight + 15 + "px";
      		}
			break;
		case "quickSort":
			document.getElementById('step1').innerHTML = '\u2003quickSort (array, left, right):<br>';
			document.getElementById('step2').innerHTML = '\u2003\u2003\u2003if array.length > 1:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003index = partition(array, left, right);';
			document.getElementById('step3').innerHTML = '\u2003\u2003\u2003\u2003\u2003if left < index-1:\u2003\u2003quickSort(array, left, index - 1)<br>';
			document.getElementById('step4').innerHTML = '\u2003\u2003\u2003\u2003\u2003if index < right: \u2003\u2003quickSort(array, index, right)';
			document.getElementById('step5').innerHTML = '<br>\u2003partition (array, left, right):';
			document.getElementById('step6').innerHTML = '\u2003\u2003\u2003pivotIndex = floor((right + left) / 2)'
			document.getElementById('step7').innerHTML = '\u2003\u2003\u2003while left <= array[pivotIndex]:<br>';
			document.getElementById('step8').innerHTML = '\u2003\u2003\u2003\u2003\u2003while array[left] < array[pivot]: \u2003\u2003\u2000left++';
			document.getElementById('step9').innerHTML = '\u2003\u2003\u2003\u2003\u2003while array[right] > array[pivot]:\u2003\u2003right--';
			document.getElementById('step10').innerHTML = '\u2003\u2003\u2003\u2003\u2003if(left < right):<br>' +
														 '\u2003\u2003\u2003\u2003\u2003\u2003\u2003swap (array[left++], array[right--]);';
			document.getElementById('step11').innerHTML = '\u2003\u2003\u2003return left';

			if (growDiv.clientHeight) {
      			growDiv.style.height = wrapper.clientHeight + 15 + "px";
      		}
      		break;
      	case "insertionSort":
      		document.getElementById('step1').innerHTML = '\u2003insertionSort (array):<br>';
			document.getElementById('step2').innerHTML = '\u2003\u2003\u2003for i := 0 to array.length:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003j := i';
			document.getElementById('step3').innerHTML = '\u2003\u2003\u2003\u2003\u2003while j > 0:<br>';
			document.getElementById('step4').innerHTML = '\u2003\u2003\u2003\u2003\u2003\u2003\u2003if array[j] < array[j - 1]:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003swap (array[j], array[j - 1])';
			document.getElementById('step5').innerHTML = '\u2003\u2003\u2003\u2003\u2003\u2003\u2003else:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003j--';
			for (let i = 6; i < 12; i++) {
				document.getElementById("step" + i.toString()).innerHTML = '';
			}
			if (growDiv.clientHeight) {
      			growDiv.style.height = wrapper.clientHeight + 15 + "px";
      		}

	}
}

export {sleep, colorStep, colorBar, swap, shuffle, growDiv, setSort};
