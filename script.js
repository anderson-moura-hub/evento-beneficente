const API_URL = "https://script.google.com/macros/s/AKfycbwHudbxlZFFRLapcqGAJAAVP4GbZdDORDo7MZDjhYemz3tnclRSTX-hxecfPjyJ9fSZCQ/exec";

let mesaAtual = null;

const mesas = document.querySelectorAll('.mesa');

mesas.forEach(mesa => {

  mesa.addEventListener('click', () => {

    if (mesa.classList.contains('vendida')) {
      return;
    }

    mesaAtual = mesa.id;

    document.getElementById('mesaSelecionada').innerText = mesa.id;

    document.getElementById('modal').style.display = 'flex';
  });

});

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

async function reservarMesa() {

  const nome = document.getElementById('nome').value;
  const whatsapp = document.getElementById('whatsapp').value;

  if (!nome || !whatsapp) {
    alert('Preencha todos os campos');
    return;
  }

  const dados = {
    mesa: mesaAtual,
    nome,
    whatsapp
  };

  await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(dados)
  });

  alert('Reserva enviada!');

  fecharModal();

  carregarMesas();
}

async function carregarMesas() {

  const resposta = await fetch(API_URL);

  const dados = await resposta.json();

  dados.forEach(item => {

    const mesa = document.getElementById(item.mesa);

    mesa.classList.remove(
      'disponivel',
      'reservada',
      'vendida'
    );

    mesa.classList.add(item.status);

  });

}

carregarMesas();
