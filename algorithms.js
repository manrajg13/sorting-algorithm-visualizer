import {sleep, colorStep, colorBar, shuffle, swap} from './utils.js';
import {getSpeed} from './canvas.js';

let itrColor = '#d7263d';
let mscColor = '#1ad2d9';
let dftColor = '#ffffff';

// async used to pause processes to display iteration/general change visuals
async function bogoSort (chart, array) {
    var sorted = false;
    while(!sorted) {
        colorStep(2)
        shuffle(chart);
        await sleep(chart);                                 // sleep after each shuffle
        for(var i = 1; i < array.length; i++){
            if (array[i-1] > array[i]) {
                sorted = false;
                colorStep(4);
                await sleep(chart);
                break;
            }
            else {
                sorted = true;
                colorStep(3);
                chart.update();
            }
        }
    }
}

async function bubbleSort (chart, array) {
    for (let i = 0; i < array.length; i++) {
        let swapped = false;
        colorStep(2);
        await sleep(chart);
        for (let j = 0; j < array.length-i-1; j++) {
            colorStep(3);
            await colorBar(chart, j, itrColor, 1);          // color each inner iteration
            if (array[j] > array[j + 1]) {
                colorStep(4);
                await swap(chart, j, j+1);
                await sleep(chart);
                swapped = true;
            }
        }

        if (!swapped) {
            colorStep(5);
            await sleep(chart);
            break;
        }
    }
}

async function selectionSort(chart, array) {
    for(let i = 0; i < array.length; i++) {
        let min = i;
        colorBar(chart, min, mscColor, 0);                  // color each outer iteration
        colorStep(2);
        await sleep(chart);
        for(let j = i+1; j < array.length; j++){
            colorStep(3);
            await colorBar(chart, j, itrColor, 1);          // color each inner iteration going in reverse
            if(array[j] < array[min]) {
                colorBar(chart, min, dftColor, 0);          // recolor min value
                min=j;
                colorBar(chart, min, mscColor, 0);
                colorStep(4);
                await sleep(chart);
            }
        }
        if (min != i) {
            colorStep(5);
            await swap(chart, i, min);
            await sleep(chart);
        }
        colorBar(chart, min, dftColor, 0);                  // reset min color
    }
}

async function partition(chart, array, left, right) {
    var pivot = array[Math.floor((right + left) / 2)], i = left, j = right;
    while (i <= j) {
        while (array[i] < pivot) {
            colorStep(8);
            await colorBar(chart, i, itrColor, 1);
            i++;
        }
        while (array[j] > pivot) {
            colorStep(9);
            await colorBar(chart, j, itrColor, 1);
            j--;
        }
        if (i <= j) {
            colorStep(10);
            swap(chart, i, j);
            await sleep(chart);
            i++;
            j--;
        }
    }
    return i;
}

async function quickSort(chart, array, left, right) {
    var index;
    if (array.length > 1) {
        colorStep(2);
        await sleep(chart);
        index = await partition(chart, array, left, right);
        await colorBar(chart, index, mscColor, 0);
        if (left < index - 1) {
            colorStep(3);
            await sleep(chart);
            await quickSort(chart, array, left, index - 1);
            colorBar(chart, index-1, dftColor, 0);
        }
        if (index < right) {
            colorStep(4);
            await sleep(chart);
            await quickSort(chart, array, index, right);
            colorBar(chart, right, dftColor, 0);
        }
    }
    return array;
}

async function insertionSort(chart, array) {
    for (let i = 1; i < array.length; i++) {
        let j = i;
        colorStep(2);
        colorBar(chart, i, itrColor, 0);
        await sleep(chart);
        while (j > 0) {
            if (array[j] < array[j - 1]) {
                colorStep(5);
                await colorBar(chart, j-1, mscColor, 1);
                swap(chart, j, j-1);
                colorStep(4);
                await sleep(chart);
                colorBar(chart, i, itrColor, 0);
            }
            else{
                j--;
                await colorBar(chart, j-1, mscColor, 1);
            }
        }
        colorBar(chart, i, dftColor, 0);
    }
}

function isSorted(array) {
    for(var i = 1; i < array.length; i++){
        if (array[i-1] > array[i]) {
            return false;
        }
    }
    return true;
}

export {bogoSort, bubbleSort, selectionSort, partition, quickSort, insertionSort, isSorted};
