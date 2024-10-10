
document.getElementById('form-contato').addEventListener('submit', function(event) {
    event.preventDefault();

    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let mensagem = document.getElementById('mensagem').value;

    if (nome && email && mensagem) {
        alert('Obrigado por entrar em contato, ' + nome + '!');
        document.getElementById('form-contato').reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

const carouselImages = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');

let index = 0;
const totalImages = images.length;

function showNextImage() {
    index = (index + 1) % totalImages; // Atualiza o índice para o próximo
    const offset = -index * 100; // Calcula o deslocamento
    carouselImages.style.transform = `translateX(${offset}%)`; // Aplica o deslocamento
}

// Muda a imagem a cada 3 segundos
setInterval(showNextImage, 3000);

