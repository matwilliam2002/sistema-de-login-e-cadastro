document.addEventListener('DOMContentLoaded', function() {
    var btnLogin = document.getElementById('btn-login');
    var formLogin = document.getElementById('form_login');

    btnLogin.addEventListener('click', function(event) {
        event.preventDefault();

        const formData = new FormData(formLogin);
        const usuario = formData.get('usuario');
        const senha = formData.get('senha');

        console.log('Dados de login enviados:', { usuario, senha });

        fetch('http://localhost:3000/pages/index', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario, senha })
        })
        .then(response => {
            console.log('Status da resposta:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos do servidor:', data);
            if (data.success) {
                window.location.href = '../pages/programa.html';
            } else {
                alert('Insira o email e a senha corretamente');
            }
        })
        .catch(error => {
            console.error('Erro ao autenticar:', error);
            alert('Erro ao tentar autenticar. Verifique se o servidor está em execução.');
        });
    });
});
