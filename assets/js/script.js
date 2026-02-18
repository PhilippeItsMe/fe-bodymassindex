const metric = document.querySelector('#metric');
const cm = document.querySelector('#cm');
const kg = document.querySelector('#kg');
const bmiResult = document.querySelector('.bmi-result');
const bmiContent = document.querySelector('.bmi-content');
const unitSize = document.querySelector('.unit-size');
const unitWeight = document.querySelector('.unit-weight');

let size = 0;
let weight = 0;
let bmi = 0;
let weightMax = 0;
let weightMin = 0;
let systemChoice = "metric";

function updateBMI (size, weight) {
    if (metric.checked) {
        size = size / 100;
        bmi = weight / (size * size)
        weightMax = 24.9 * size * size;
        weightMin = 18.5 * size * size;
        unit = 'kgs';
    }

    else {
        bmi = 703 * weight / (size * size)
        weightMax = (24.9 * size * size)/703;
        weightMin = (18.5 * size * size)/703;
        unit = 'lbs';
    }
    
    bmiResult.textContent = bmi.toFixed(2);

    if (bmi >= 18.5 && bmi <= 24.9) {
        bmiContent.textContent = `Your BMI suggests you’re a healthy weight. 
        Your ideal weight is between ${
            weightMin.toFixed(1)} ${unit} - ${weightMax.toFixed(1)} ${unit}.`;
    }
    else {
        bmiContent.textContent = `Your BMI suggests you’re a unhealthy weight. 
        Your ideal weight is between ${
            weightMin.toFixed(1)} ${unit} - ${weightMax.toFixed(1)} ${unit}.`;
    }
}

cm.addEventListener('change', () => {
    size = Number(cm.value);
    weight = Number(kg.value);
    updateBMI (size, weight); 
});

kg.addEventListener('change', () => {
    size = Number(cm.value);
    weight = Number(kg.value);
    updateBMI (size, weight);
});

function updateUnits() {
    if (metric.checked) {
        unitSize.textContent = "cm";
        unitWeight.textContent = "kg";
    } else {
        unitSize.textContent = "in";
        unitWeight.textContent = "lbs";
    }
}

metric.addEventListener('change', updateUnits);
imperial.addEventListener('change', updateUnits);
