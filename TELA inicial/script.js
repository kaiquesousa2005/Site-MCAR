
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

let currentIndex = 0;
const images = document.querySelector('.carousel-images');
const totalImages = images.querySelectorAll('img').length;

// Função para deslizar para a próxima imagem
function slideNext() {
  currentIndex = (currentIndex + 1) % totalImages;
  const offset = -currentIndex * (800 + 20); // 800px largura da imagem + 20px do gap
  images.style.transform = `translateX(${offset}px)`;
}

// Função para deslizar para a imagem anterior
function slidePrev() {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  const offset = -currentIndex * (800 + 20);
  images.style.transform = `translateX(${offset}px)`;
}

// Muda de imagem automaticamente a cada 5 segundos
setInterval(slideNext, 5000);




