document.getElementById('form-simulacao').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let nome = document.getElementById('nome').value;
    let dataNascimento = document.getElementById('data-nascimento').value;
    let cpf = document.getElementById('cpf').value;
    let carroInteresse = document.getElementById('carro-interesse').value;
    let cnh = document.getElementById('cnh').value; // Captura o valor selecionado
    let whatsapp = document.getElementById('whatsapp').value;
    let mensagem = document.getElementById('mensagem').value;

    if (nome && dataNascimento && cpf && carroInteresse && cnh && whatsapp && mensagem) {
        try {
            const response = await fetch('http://localhost:3000/simulacao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nomeCompleto: nome,
                    dataNascimento: dataNascimento,
                    cpf: cpf,
                    carroInteresse: carroInteresse,
                    possuiCnh: cnh, // Armazena "Sim" ou "Não" diretamente
                    whatsapp: whatsapp,
                    mensagem: mensagem
                })
            });

            const result = await response.json();
            alert(`Obrigado, ${nome}! Sua solicitação de simulação para o carro "${carroInteresse}" foi enviada.`);
            document.getElementById('form-simulacao').reset();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
            alert('Ocorreu um erro ao enviar sua solicitação.');
        }
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
