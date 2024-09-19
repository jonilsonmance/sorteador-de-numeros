const quantityInput = document.getElementById("quantity");
const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");
const styleCheckbox = document.getElementById("style");
const btnSortear = document.querySelector(".btn-sortear");
const btnRepeat = document.querySelector(".btn-repeat");
const mainContainer = document.querySelector(".container");
const contentPrize = document.querySelector(".content-prize");
const temporySection = document.querySelector(".tempory");

let previousDrawnNumbers = [];

// Formata a entrada do usuário para permitir apenas números
const formatInput = (input) => {
    let value = input.value.replace(/\D/g, "");
    input.value = value;
};

// Adiciona eventos para formatação de entrada
quantityInput.oninput = () => formatInput(quantityInput);
minInput.oninput = () => formatInput(minInput);
maxInput.oninput = () => formatInput(maxInput);

// Adiciona evento para o botão de sorteio
btnSortear.addEventListener("click", (e) => {
    e.preventDefault();
    handleSortear();
});

btnRepeat.addEventListener("click", (e) => {
    e.preventDefault();
    handleSortear();
});

// Função para sortear números
function drawNumbers(min, max, quantity, noRepeat = false) {
    let drawnNumbers = [];

    while (drawnNumbers.length < quantity) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        
        if (!drawnNumbers.includes(randomNumber)) {
            // Se o checkbox estiver marcado, verifica se o número já foi sorteado anteriormente
            if (noRepeat && previousDrawnNumbers.includes(randomNumber)) {
                continue; // Pula este número se ele já tiver sido sorteado
            }
            drawnNumbers.push(randomNumber);
        }
    }

    previousDrawnNumbers = drawnNumbers; // Armazena os números sorteados
    return drawnNumbers;
}

// Função para lidar com o sorteio
function handleSortear() {
    const quantity = parseInt(quantityInput.value, 10);
    const min = parseInt(minInput.value, 10);
    const max = parseInt(maxInput.value, 10);

    const noRepeat = styleCheckbox.checked;

    const drawnNumbers = drawNumbers(min, max, quantity, noRepeat);

    // Exibe os números sorteados na seção tempory
    updateTemporySection(drawnNumbers);

    // Alterna a visibilidade entre as sections
    toggleSections();
}

function updateTemporySection(numbers) {
    const primaryNumber = numbers[0] || "";
    const secondaryNumber = numbers[1] || "";

    const primaryDiv = document.querySelector(".tempory .primary");
    const secondaryDiv = document.querySelector(".tempory .secondary");

    primaryDiv.textContent = primaryNumber;
    secondaryDiv.textContent = secondaryNumber;
}

function toggleSections() {
    contentPrize.classList.toggle("remove");
    temporySection.classList.toggle("remove");
}
