document.addEventListener('DOMContentLoaded', function () {
    const historyDisplay = document.getElementById('history');
    const equationDisplay = document.getElementById('current-equation');
    const buttons = document.querySelectorAll('.button');
    let equation = '';
    let history = '';
    let ans = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            switch (value) {
                case 'clear':
                    equation = '';
                    equationDisplay.value = '';
                    history = '';
                    historyDisplay.value = '';
                    break;
                case 'del':
                    equation = equation.slice(0, -1);
                    equationDisplay.value = equation;
                    break;
                case 'ans':
                    equation += ans;
                    equationDisplay.value = equation;
                    break;
                case 'ENTER':
                    try {
                        let formattedEquation = equation.replace(/x/g, '*').replace(/÷/g, '/');
                        formattedEquation = formattedEquation.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');
                        ans = eval(formattedEquation);
                        history += equation + '\n';
                        equationDisplay.value = ans;
                        equation = '';
                        historyDisplay.value = history;
                    } catch {
                        equationDisplay.value = 'Error';
                    }
                    break;
                default:
                    equation += value;
                    equationDisplay.value = equation;
                    break;
            }
        });
    });
});
