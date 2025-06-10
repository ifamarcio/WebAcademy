class Aluno {
  constructor(
    public id: number,
    public nome: string,
    public idade: number,
    public altura: number,
    public peso: number
  ) {}
}

class Turma {
  public alunos: Aluno[] = [];

  constructor(public id: number, public nome: string) {}

  getNumAlunos(): number {
    return this.alunos.length;
  }

  getMediaIdades(): number {
    return this.getMedia(a => a.idade);
  }

  getMediaAlturas(): number {
    return this.getMedia(a => a.altura);
  }

  getMediaPesos(): number {
    return this.getMedia(a => a.peso);
  }

  private getMedia(selector: (a: Aluno) => number): number {
    if (this.alunos.length === 0) return 0;
    return (
      this.alunos.reduce((soma, aluno) => soma + selector(aluno), 0) /
      this.alunos.length
    );
  }

  adicionarAluno(aluno: Aluno) {
    this.alunos.push(aluno);
  }

  removerAluno(id: number) {
    this.alunos = this.alunos.filter(a => a.id !== id);
  }

  editarAluno(id: number, dados: Partial<Omit<Aluno, 'id'>>) {
    const aluno = this.alunos.find(a => a.id === id);
    if (aluno) Object.assign(aluno, dados);
  }
}

// ===========================
// Aplicação DOM
// ===========================

const turma = new Turma(1, "Educação Física");

const form = document.getElementById('form-aluno') as HTMLFormElement;
const tabela = document.getElementById('tabela-alunos') as HTMLTableSectionElement;
const inputId = document.getElementById('aluno-id') as HTMLInputElement;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = (document.getElementById('nome') as HTMLInputElement).value;
  const idade = Number((document.getElementById('idade') as HTMLInputElement).value);
  const altura = Number((document.getElementById('altura') as HTMLInputElement).value);
  const peso = Number((document.getElementById('peso') as HTMLInputElement).value);

  const id = inputId.value ? Number(inputId.value) : Date.now();

  const existente = turma.alunos.find(a => a.id === id);
  if (existente) {
    turma.editarAluno(id, { nome, idade, altura, peso });
  } else {
    turma.adicionarAluno(new Aluno(id, nome, idade, altura, peso));
  }

  form.reset();
  inputId.value = '';
  atualizarTela();
});

function atualizarTela() {
  tabela.innerHTML = '';
  turma.alunos.forEach(aluno => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.idade}</td>
      <td>${aluno.altura.toFixed(2)}</td>
      <td>${aluno.peso.toFixed(1)}</td>
      <td>
        <button onclick="editar(${aluno.id})">Editar</button>
        <button onclick="apagar(${aluno.id})">Apagar</button>
      </td>
    `;
    tabela.appendChild(tr);
  });

  (document.getElementById('estat-num') as HTMLElement).innerText = String(turma.getNumAlunos());
  (document.getElementById('estat-idade') as HTMLElement).innerText = turma.getMediaIdades().toFixed(1);
  (document.getElementById('estat-altura') as HTMLElement).innerText = turma.getMediaAlturas().toFixed(2);
  (document.getElementById('estat-peso') as HTMLElement).innerText = turma.getMediaPesos().toFixed(1);
}

// Expor funções no escopo global para uso no onclick
(window as any).editar = (id: number) => {
  const aluno = turma.alunos.find(a => a.id === id);
  if (aluno) {
    inputId.value = String(aluno.id);
    (document.getElementById('nome') as HTMLInputElement).value = aluno.nome;
    (document.getElementById('idade') as HTMLInputElement).value = String(aluno.idade);
    (document.getElementById('altura') as HTMLInputElement).value = String(aluno.altura);
    (document.getElementById('peso') as HTMLInputElement).value = String(aluno.peso);
  }
};

(window as any).apagar = (id: number) => {
  turma.removerAluno(id);
  atualizarTela();
};
