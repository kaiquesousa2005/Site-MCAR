
document.getElementById('form-contato').addEventListener('submit', async function (event) {
  event.preventDefault(); // Evita o comportamento padrão de envio do formulário
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;

  try {
      const response = await fetch('http://localhost:3000/contato', {
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
      } else {
          alert('Erro ao enviar os dados.'); // Exibir mensagem de erro
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Ocorreu um erro ao enviar os dados.');
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



