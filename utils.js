import {getSpeed, getArray, getColors} from './canvas.js';

let shuffling = false;

function sleep (chart) {
	chart.update();
	let ms = getSpeed();
	return new Promise(resolve => setTimeout(resolve, ms));
}

function colorStep(step) {
	for (let i = 1; i < 7; i++) {
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
			document.getElementById('step1').innerHTML = '\u2003while sorted = false:<br>' + 
														 '\u2003\u2003\u2003shuffle array';
			document.getElementById('step2').innerHTML = '\u2003\u2003\u2003if array is sorted:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003sorted := true<br>' +
														 '\u2003\u2003\u2003\u2003\u2003break';
			document.getElementById('step3').innerHTML = '\u2003\u2003\u2003else:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003sorted := false';
			document.getElementById('step4').innerHTML = '';
      		growDiv.style.height = wrapper.clientHeight + 15 + "px";
			break;
		case "bubbleSort":
			document.getElementById('step1').innerHTML = '\u2003for i := 0 to sizeOfArray:<br>' +
														 '\u2003\u2003\u2003swapped = false';
			document.getElementById('step2').innerHTML = '\u2003\u2003\u2003for j := 0 to sizeOfArray - i - 1:';
			document.getElementById('step3').innerHTML = '\u2003\u2003\u2003\u2003\u2003if array[j] > array[j+1]:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003\u2003\u2003swap (array[j], array[j+1])<br>' +
														 '\u2003\u2003\u2003\u2003\u2003\u2003\u2003swapped = true';
			document.getElementById('step4').innerHTML = '\u2003\u2003\u2003if swapped = false:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003break';
			growDiv.style.height = wrapper.clientHeight + 15 + "px";
			break;
		case "selectionSort":
			document.getElementById('step1').innerHTML = '\u2003for i := 0 to sizeOfArray:<br>' +
														 '\u2003\u2003\u2003min = i';
			document.getElementById('step2').innerHTML = '\u2003\u2003\u2003for j := i + 1 to sizeOfArray:';
			document.getElementById('step3').innerHTML = '\u2003\u2003\u2003\u2003\u2003if array[j] < min:<br>' + 
														 '\u2003\u2003\u2003\u2003\u2003\u2003\u2003min = j';
			document.getElementById('step4').innerHTML = '\u2003\u2003\u2003if min != i:<br>' +
														 '\u2003\u2003\u2003\u2003\u2003swap';
			growDiv.style.height = wrapper.clientHeight + 15 + "px";
			break;
	}
}

export {sleep, colorStep, colorBar, swap, shuffle, growDiv, setSort};
