let currentIndices = []; // Inicializa um array vazio
const cars = document.querySelectorAll('.carro');

// Inicializa a primeira imagem para cada carro e configura os índices
cars.forEach((car, index) => {
    currentIndices[index] = 0; // Define o índice inicial para cada carro
    showImage(index, 0); // Mostra a primeira imagem para cada carro
});

function showImage(carIndex, imgIndex) {
    const images = cars[carIndex].querySelectorAll('img');
    // Oculta todas as imagens do carro atual
    images.forEach(img => img.style.display = 'none');
    // Mostra a imagem do carro atual com o índice especificado
    images[imgIndex].style.display = 'block';
}

function slideNext(carIndex) {
    const images = cars[carIndex].querySelectorAll('img');
    let imgIndex = currentIndices[carIndex];
    imgIndex = (imgIndex + 1) % images.length; // Avança o índice da imagem
    currentIndices[carIndex] = imgIndex; // Atualiza o índice atual
    showImage(carIndex, imgIndex); // Exibe a imagem atualizada
}

function slidePrev(carIndex) {
    const images = cars[carIndex].querySelectorAll('img');
    let imgIndex = currentIndices[carIndex];
    imgIndex = (imgIndex - 1 + images.length) % images.length; // Retrocede o índice da imagem
    currentIndices[carIndex] = imgIndex; // Atualiza o índice atual
    showImage(carIndex, imgIndex); // Exibe a imagem atualizada
}
