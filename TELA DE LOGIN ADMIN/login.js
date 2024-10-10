document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Captura os valores dos campos de entrada
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Aqui você pode validar as credenciais e fazer login
    console.log('Login attempted:', { username, password });
  
    // Limpa o formulário após submissão
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  });
  