interface Produto {
  tipo: string;
  modelo: string;
  fabricante: string;
  valor: number;
  descricao(): string;
}

class TV implements Produto {
  constructor(
    public tipo: string,
    public modelo: string,
    private resolucao: string,
    public fabricante: string,
    public valor: number
  ) {}

  descricao(): string {
    return `Resolução: ${this.resolucao}`;
  }
}

class Celular implements Produto {
  constructor(
    public tipo: string,
    public modelo: string,
    private memoria: string,
    public fabricante: string,
    public valor: number
  ) {}

  descricao(): string {
    return `Memória: ${this.memoria}`;
  }
}

class Bicicleta implements Produto {
  constructor(
    public tipo: string,
    public modelo: string,
    private aro: string,
    public fabricante: string,
    public valor: number
  ) {}

  descricao(): string {
    return `Aro: ${this.aro}`;
  }
}

class Carrinho<T extends Produto> {
  private produtos: T[] = [];

  adicionar(produto: T): void {
    this.produtos.push(produto);
  }

  getTotalItens(): number {
    return this.produtos.length;
  }

  getTotalValor(): number {
    return this.produtos.reduce((soma, p) => soma + p.valor, 0);
  }

  getProdutos(): T[] {
    return [...this.produtos];
  }
}

const carrinho = new Carrinho<Produto>();
const form = document.getElementById('form-produto') as HTMLFormElement;
const tabela = document.getElementById('tabela-produtos') as HTMLTableSectionElement;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const tipo = (document.getElementById('tipo') as HTMLSelectElement).value;
  const modelo = (document.getElementById('modelo') as HTMLInputElement).value;
  const f1 = (document.getElementById('f1') as HTMLInputElement).value;
  const fabricante = (document.getElementById('fabricante') as HTMLInputElement).value;
  const valor = parseFloat((document.getElementById('valor') as HTMLInputElement).value);

  let produto: Produto;

  if (tipo === 'tv') {
    produto = new TV('TV', modelo, f1, fabricante, valor);
  } else if (tipo === 'celular') {
    produto = new Celular('Celular', modelo, f1, fabricante, valor);
  } else {
    produto = new Bicicleta('Bicicleta', modelo, f1, fabricante, valor);
  }

  carrinho.adicionar(produto);
  atualizarInterface();
  form.reset();
});

function atualizarInterface() {
  const produtos = carrinho.getProdutos();
  tabela.innerHTML = '';
  produtos.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.tipo}</td>
      <td>${p.modelo}</td>
      <td>${p.descricao()}</td>
      <td>${p.fabricante}</td>
      <td>${p.valor.toFixed(2)}</td>
    `;
    tabela.appendChild(tr);
  });

  (document.getElementById('total-itens') as HTMLElement).innerText = carrinho.getTotalItens().toString();
  (document.getElementById('valor-total') as HTMLElement).innerText = carrinho.getTotalValor().toFixed(2);
}
