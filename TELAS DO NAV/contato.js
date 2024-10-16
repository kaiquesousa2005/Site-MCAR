document.getElementById('form-simulacao').addEventListener('submit', function(event) {
    event.preventDefault();

    let nome = document.getElementById('nome').value;
    let dataNascimento = document.getElementById('data-nascimento').value;
    let cpf = document.getElementById('cpf').value;
    let carroInteresse = document.getElementById('carro-interesse').value;
    let cnh = document.getElementById('cnh').value;
    let whatsapp = document.getElementById('whatsapp').value;

    if (nome && dataNascimento && cpf && carroInteresse && cnh && whatsapp) {
        alert(`Obrigado, ${nome}! Sua solicitação de simulação para o carro "${carroInteresse}" foi enviada.`);
        document.getElementById('form-simulacao').reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Função para restringir a entrada do campo "Nome Completo" para apenas letras e espaços
document.getElementById('nome').addEventListener('input', function(event) {
    let input = event.target;
    let previousValue = input.value;
    input.value = input.value.replace(/[^a-zA-Z\sÀ-ÖØ-öø-ÿ]/g, ''); // Permite apenas letras, espaços e acentos

    if (previousValue !== input.value) {
        alert('Utilize somente letras!');
    }
});

// Função para permitir apenas números no campo CPF
document.getElementById('cpf').addEventListener('input', function(event) {
    let input = event.target;
    let previousValue = input.value;
    input.value = input.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número

    if (previousValue !== input.value) {
        alert('Utilize somente números!');
    }
});

// Função para permitir apenas números no campo WhatsApp
document.getElementById('whatsapp').addEventListener('input', function(event) {
    let input = event.target;
    let previousValue = input.value;
    input.value = input.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número

    if (previousValue !== input.value) {
        alert('Utilize somente números!');
    }
});
