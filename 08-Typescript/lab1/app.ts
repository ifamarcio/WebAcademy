type Lembrete = {
  id: number;
  titulo: string;
  dataInsercao: Date;
  dataLimite?: Date;
  descricao?: string;
};

const lista: Lembrete[] = [];
let idAtual = 0;

const form = document.getElementById('form-lembrete') as HTMLFormElement;
const ul = document.getElementById('lista-lembretes') as HTMLUListElement;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const titulo = (document.getElementById('titulo') as HTMLInputElement).value;
  const descricao = (document.getElementById('descricao') as HTMLTextAreaElement).value;
  const dataLimiteStr = (document.getElementById('dataLimite') as HTMLInputElement).value;

  const novo: Lembrete = {
    id: idAtual++,
    titulo,
    dataInsercao: new Date(),
    dataLimite: dataLimiteStr ? new Date(dataLimiteStr) : undefined,
    descricao: descricao || undefined
  };

  lista.push(novo);
  form.reset();
  renderizarLista();
});

function renderizarLista() {
  ul.innerHTML = '';
  lista.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${item.titulo}</strong><br>
      Inserido em: ${item.dataInsercao.toLocaleString()}<br>
      ${item.dataLimite ? 'Data Limite: ' + item.dataLimite.toLocaleString() + '<br>' : ''}
      ${item.descricao ? 'Descrição: ' + item.descricao + '<br>' : ''}
    `;

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.onclick = () => editarLembrete(item.id);

    const btnApagar = document.createElement('button');
    btnApagar.textContent = 'Apagar';
    btnApagar.onclick = () => apagarLembrete(item.id);

    li.appendChild(btnEditar);
    li.appendChild(btnApagar);
    ul.appendChild(li);
  });
}

function apagarLembrete(id: number) {
  const index = lista.findIndex(l => l.id === id);
  if (index >= 0) {
    lista.splice(index, 1);
    renderizarLista();
  }
}

function editarLembrete(id: number) {
  const lembrete = lista.find(l => l.id === id);
  if (!lembrete) return;

  const novoTitulo = prompt('Novo título:', lembrete.titulo);
  if (novoTitulo !== null) lembrete.titulo = novoTitulo;

  const novaDescricao = prompt('Nova descrição:', lembrete.descricao || '');
  lembrete.descricao = novaDescricao || undefined;

  const novaDataLimite = prompt('Nova data limite (yyyy-mm-ddThh:mm):', lembrete.dataLimite?.toISOString().slice(0,16));
  if (novaDataLimite) lembrete.dataLimite = new Date(novaDataLimite);

  renderizarLista();
}
