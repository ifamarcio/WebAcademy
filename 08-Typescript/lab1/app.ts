type Lembrete = [string, Date, Date?, string?];

const form = document.getElementById('form-lembrete') as HTMLFormElement;
const lista = document.getElementById('lista-lembretes') as HTMLUListElement;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const titulo = (document.getElementById('titulo') as HTMLInputElement).value;
  const descricao = (document.getElementById('descricao') as HTMLTextAreaElement).value;
  const dataLimiteStr = (document.getElementById('dataLimite') as HTMLInputElement).value;

  const dataInsercao = new Date();
  const dataLimite = dataLimiteStr ? new Date(dataLimiteStr) : undefined;

  const lembrete: Lembrete = [titulo, dataInsercao, dataLimite, descricao];

  renderLembrete(lembrete);
  form.reset();
});

function renderLembrete(lembrete: Lembrete) {
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${lembrete[0]}</strong><br>
    Inserido em: ${lembrete[1].toLocaleString()}<br>
    ${lembrete[2] ? 'Data Limite: ' + lembrete[2].toLocaleString() + '<br>' : ''}
    ${lembrete[3] ? 'Descrição: ' + lembrete[3] + '<br>' : ''}
    <button onclick="this.parentElement?.remove()">Apagar</button>
  `;
  lista.appendChild(li);
}
