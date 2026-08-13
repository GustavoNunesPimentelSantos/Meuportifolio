// Elementos da interface
const loginBtn = document.getElementById('login-btn');
const cadastrarBtn = document.getElementById('cadastrar-btn');

const loginContainer = document.getElementById('login-container');
const cadastroContainer = document.getElementById('cadastro-container');
const successMessage = document.getElementById('success-message');

// Validação do login
loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && password) {
        // Após preencher os dados, libera o formulário de cadastro
        loginContainer.classList.add('hidden');
        cadastroContainer.classList.remove('hidden');
    } else {
        alert('Por favor, preencha usuário e senha.');
    }
});

// Cadastro da empresa
cadastrarBtn.addEventListener('click', () => {
    const empresa = document.getElementById('empresa').value.trim();
    const cnpj = document.getElementById('cnpj').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const atividade = document.getElementById('atividade').value.trim();

    if (empresa && cnpj && email && telefone && endereco && atividade) {
        successMessage.classList.remove('hidden');

        // Limpa os campos após o cadastro
        document.getElementById('empresa').value = '';
        document.getElementById('cnpj').value = '';
        document.getElementById('email').value = '';
        document.getElementById('telefone').value = '';
        document.getElementById('endereco').value = '';
        document.getElementById('atividade').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
