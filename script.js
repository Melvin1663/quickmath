const inputElement = document.getElementById('input');
const problemElement = document.getElementById('problem');
const timeLeftElement = document.getElementById('timeLeft');

let counter = 0;
let endTime;

const randomMathQuestion = (max) => {
    if (!max) max = 30;

    let operations = ['+', '-', '×', '÷'];
    let operation = operations[Math.ceil(Math.random() * operations.length - 1)];
    let res;

    if (operation == '×') max = 10;

    if (operation == '÷') {
        let firstNum = Math.ceil(Math.random() * max);
        let allDiv = [];

        for (let i = 1; i <= firstNum; i++) {
            if (firstNum % i === 0) {
                allDiv.push(i);
            }
        }

        res = `${firstNum} ${operation} ${allDiv[Math.ceil(Math.random() * allDiv.length - 1)]}`
    } else res = `${Math.ceil(Math.random() * max)} ${operation} ${Math.ceil(Math.random() * max)}`

    problemElement.innerHTML = res;
}

randomMathQuestion();

const input = document.querySelector("input");

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (!inputElement.value || inputElement.value != eval(problemElement.innerHTML.replace('×', '*').replace('÷', '/'))) return;

        if (!counter) {
            endTime = Date.now() + 30000;

            let interval = setInterval(() => {
                if ((endTime - Date.now()) <= 0) return timeLeftElement.innerHTML = `You scored ${counter-1}!`;
                timeLeftElement.innerHTML = `<code>${((endTime - Date.now()) / 1000).toFixed(1)}s</code> Left`
            }, 100)

            setTimeout(() => {
                inputElement.disabled = true;
                inputElement.value = '';

                clearInterval(interval);
            }, 30000)
        }

        counter++;

        inputElement.value = '';
        randomMathQuestion();
    }
});