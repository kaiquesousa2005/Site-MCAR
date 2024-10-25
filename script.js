document.getElementById('form-contato').addEventListener('submit', async function (event) {
  event.preventDefault(); // Evita o comportamento padrão de envio do formulário
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;

  try {
      const response = await fetch('https://site-mcar-production.up.railway.app/contato', { // substitua pela URL do seu backend no Railway
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome, email, mensagem }),
      });

      if (response.ok) {
          const data = await response.json();
          alert('Dados enviados com sucesso!'); // Exibir mensagem de sucesso
          console.log(data);
          document.getElementById('form-contato').reset(); // Limpa o formulário após o envio
      } else {
          alert('Erro ao enviar os dados.'); // Exibir mensagem de erro
      }
  } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao enviar os dados.');
  }
});


let currentIndex = 0;
const images = document.querySelector('.carousel-images');
const totalImages = images.querySelectorAll('img').length;
const carousel = document.querySelector('.carousel'); // Selecione o carrossel
const gap = 20; // Espaço entre as imagens

// Função para calcular a largura do carrossel com base na tela
function getCarouselWidth() {
  const carouselWidth = carousel.clientWidth; // Largura atual do carrossel
  return carouselWidth + gap; // Retorna a largura total incluindo o espaço
}

// Função para deslizar para a próxima imagem
function slideNext() {
  currentIndex = (currentIndex + 1) % totalImages;
  const offset = -currentIndex * getCarouselWidth(); // Use a largura do carrossel
  images.style.transform = `translateX(${offset}px)`;
}

// Função para deslizar para a imagem anterior
function slidePrev() {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  const offset = -currentIndex * getCarouselWidth(); // Use a largura do carrossel
  images.style.transform = `translateX(${offset}px)`;
}

// Muda de imagem automaticamente a cada 3 segundos
setInterval(slideNext, 3000);








