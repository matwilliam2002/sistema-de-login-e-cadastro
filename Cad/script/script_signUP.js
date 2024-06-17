document.addEventListener('DOMContentLoaded', function() {
    var btnCadastro = document.getElementById('btnCadastro');
    var form = document.getElementById('form_signup');

    btnCadastro.addEventListener('click', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do botão (submit do formulário)

        var name = document.getElementById('name').value;
        var lastName = document.getElementById('lastName').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;

        if (!name || !lastName || !email || !password || !confirmPassword) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
         // Validação de email
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert('Por favor, insira um endereço de email válido.');
            return;
        }

        if (password !== confirmPassword) {
            alert('As senhas não correspondem.');
            return;
        }

        fetch('http://127.0.0.1:3000/pages/signUP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                lastName: lastName,
                email: email,
                password: password
            })
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar.');
            }
            return response.json();
        })
        .then(function(data) {
            alert('Cadastro realizado com sucesso!');
            form.reset();
            window.location.href='../pages/index.html'
        })
        .catch(function(error) {
            alert('Erro ao cadastrar: ' + error.message);
        });
    });
    
});

