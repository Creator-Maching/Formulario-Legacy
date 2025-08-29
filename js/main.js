const links = document.querySelectorAll('a.link'); 
const mainContent = document.getElementById('main-content');


function carregarPagina(url) {
  axios.get(url)
    .then(response => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, 'text/html');
      const newContent = doc.getElementById('main-content');
      if (newContent) {
        mainContent.innerHTML = newContent.innerHTML;
        formulario(); // reaplica validações do formulário se existir
      } else {
        console.log('main-content não encontrado na página:', url);
      }
    })
    .catch(error => {
      console.error('Erro ao carregar a página:', error);
    });
}

// Adiciona evento nos links para carregar conteúdo via AJAX
links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); 
    const url = this.getAttribute('href');
    carregarPagina(url);
  });
});

// Função de validação do formulário
function formulario(){
  const form = document.querySelector('.form');
  if (!form) return; 

  form.addEventListener('submit', evento => {
    evento.preventDefault();
    
    const nome = document.querySelector('.nome').value.trim();
    const email = document.querySelector('.email').value.trim();
    const senha = document.querySelector('.senha').value;
    const confirmaSenha = document.querySelector('.confirmaSenha').value;
    const inscrito = document.querySelector('.botao');
    const novoBotao = document.querySelector('.naveespacial');
    
    // Validações
    if (!/^[a-zA-Z]+$/.test(nome)) return alert('Nome inválido');
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) return alert('Email inválido');
    if (senha.length < 5) return alert('A senha deve ter pelo menos 5 caracteres');
    if (confirmaSenha !== senha) return alert('As senhas não conferem');

    alert("Você foi inscrito!");
    
  
    if(inscrito) inscrito.classList.add('invisivel');

    
    if(novoBotao){
      const perfil = document.createElement('p');
      perfil.textContent = `Olá ${nome}`;
      perfil.classList.add('bg-danger', 'text-light', 'redondo', 'p-2');
      novoBotao.appendChild(perfil);
    }

    carregarPagina('index.html'); 
  });
}

// Inicializa formulário na primeira carga
formulario();
