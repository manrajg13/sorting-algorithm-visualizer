import {getSpeed, getArray, getColors} from './sort.js';

let shuffling = false;

function sleep (chart) {
	chart.update();
	let ms = getSpeed();
	return new Promise(resolve => setTimeout(resolve, ms));
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

export {sleep, colorBar, swap, shuffle};