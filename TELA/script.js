document.getElementById('menu-toggle').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    
    if (menu.classList.contains('menu-fechado')) {
        menu.classList.remove('menu-fechado');
        menu.classList.add('menu-aberto');
    } else {
        menu.classList.remove('menu-aberto');
        menu.classList.add('menu-fechado');
    }
});


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

