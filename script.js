document.addEventListener('DOMContentLoaded', () => {
  // Clique na "frase engraçada"
  const quoteDiv = document.querySelector('.funny-quote');
  if (quoteDiv) {
    quoteDiv.addEventListener('click', () => {
      alert('Feliz aniversário! Que seu dia seja tão especial e incrível quanto você é para mim. :)');
    });
  }

  // Surpresa
  const surpriseBtn = document.querySelector('.surprise-btn');
  const surpriseMessage = document.getElementById('surpriseMessage');
  if (surpriseBtn && surpriseMessage) {
    surpriseBtn.addEventListener('click', () => {
      surpriseMessage.style.display = 'block';
      surpriseBtn.style.display = 'none';
    });
  }

  // Roleta de frases fofas
  const roleta = document.getElementById('roleta');
  const btnGirar = document.getElementById('girarRoleta');
  const fraseResultado = document.getElementById('fraseResultado');

  if (roleta && btnGirar && fraseResultado) {
    const frasesFofas = [
      "Você ilumina meus dias como um nascer do sol 💛",
      "Você é tão especial que até as estrelas ficam com inveja de você.",
      "Você faz o mundo ficar mais lindo.",
      "Coração quentinho é quando penso em você.",
      "Que bom que você aconteceu na minha vida.",
      "Você tem um abraço que cura o cansaço.",
      "Estar com você é estar em casa.",
      "Você é a razão do meu sorriso.",
      "Seu jeito de ser é meu aconchego.",
    ];

    let anguloAtual = 0;
    let girando = false;

    btnGirar.addEventListener('click', () => {
      if (girando) return;
      girando = true;

      const anguloGiro = Math.floor(Math.random() * 360 + 720); // Mínimo de 2 voltas
      anguloAtual += anguloGiro;
      roleta.style.transition = 'transform 2s cubic-bezier(0.33, 1, 0.68, 1)';
      roleta.style.transform = `rotate(${anguloAtual}deg)`;

      setTimeout(() => {
        girando = false;
        roleta.style.transition = 'none';
        // Escolhe uma frase aleatória
        const indiceFrase = Math.floor(Math.random() * frasesFofas.length);
        fraseResultado.textContent = frasesFofas[indiceFrase];
        fraseResultado.style.display = 'block';
      }, 2000);
    });
  } else {
    console.error('Elementos necessários para a roleta não encontrados.');
  }
});