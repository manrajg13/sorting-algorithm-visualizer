import {sleep, colorBar, swap, shuffle, growDiv, setSort} from './utils.js';
import {bogoSort, bubbleSort, selectionSort, quickSort, insertionSort, isSorted} from './algorithms.js'

// set default values for chart inputs
document.getElementById('algorithm-select').value = 'bubbleSort';
document.getElementById('size').value = 20;
document.getElementById('speed').value = 1000;

let ctx = document.getElementById('chart').getContext('2d');
let chart = new Chart(ctx);
let array = [];
let labels = [];
let colors = [];
let size = 20;
let speed = 1000;
let shuffling = false;

// event listeners
document.getElementById('algorithm-select').addEventListener('input', setSort);
document.getElementById('shuffle').addEventListener('click', shuffleArray);
document.getElementById('sort').addEventListener('click', sortArray);
document.getElementById('size').addEventListener('input', resizeArray);
document.getElementById('speed').addEventListener('input', setSpeed);
document.getElementById('show-steps').addEventListener('click', setSort);
document.getElementById('show-steps').addEventListener('click', growDiv);

init();

// create array of a given size colored white, destroy chart and
// create new chart with new data
async function init() {
	array = [];
	labels = [];
	colors = [];
	for (let i = 1; i <= size; i++) {
		array.push(i);
		labels.push('');
		colors.push('#ffffff');
	}

	chart.destroy();

	let config = {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				backgroundColor: colors,
				data: array,
				barPercentage: 1.0,
				categoryPercentage: 1.0
			}]
		},
		options: {
			responsive: true,
			animations: {
				colors: {duration: 0}		// disables color transition animations
			},
			plugins: {
				legend: {display: false}, 	// disables x-axis labels and hover tooltip
				tooltip: {enabled: false}
			},
			scales: {
				x: {display: false}, 
				y: {display: false}
			},
			hover: {
				mode: null
			}
		}
	};

	chart = new Chart(ctx, config);
	disableInteract(false);
}

function shuffleArray() {
	shuffle(chart);
}

function resizeArray() {
	size = this.value;
	init();
}

function setSpeed() {
	speed = 2000 - this.value;
}

function getSpeed() {
	return speed;
}

function getArray() {
	return array;
}

function getColors() {
	return colors;
}

// need to disable buttons and sliders because changes to arrays
// can make things pretty messy
function disableInteract(disable) {
	document.getElementById('algorithm-select').disabled = disable;
	document.getElementById('size').disabled = disable;
	document.getElementById('shuffle').disabled = disable;
	document.getElementById('sort').disabled = disable;
	if (disable) {
		chart.options.animation.duration = 1000;
	}

	chart.update();
}

async function sortArray () {
	disableInteract(true);
	let algorithm = document.getElementById('algorithm-select').value;

	switch(algorithm) {
		case 'bogoSort':
			await bogoSort(chart, array);
			break;
		case 'bubbleSort':
			await bubbleSort(chart, array);
			break;
		case 'selectionSort':
			await selectionSort(chart, array);
			break;
		case 'quickSort':
			await quickSort(chart, array, 0, size-1);
			break;
		case 'insertionSort':
			await insertionSort(chart, array);
			break;
	}

	await isSorted(array);
	disableInteract(false);
}

export {getSpeed, getArray, getColors};
