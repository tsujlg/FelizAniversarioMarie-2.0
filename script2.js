document.addEventListener("DOMContentLoaded", () => {
  const heart = document.getElementById("heart")
  const particlesContainer = document.getElementById("particles")

  // Função para criar partículas
  function createParticle(x, y) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.innerHTML = "♥"
    particle.style.left = x + "px"
    particle.style.top = y + "px"
    particle.style.color = `hsl(${Math.random() * 60 + 300}, 70%, 70%)`

    particlesContainer.appendChild(particle)

    // Remove a partícula após a animação
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    }, 3000)
  }

  // Evento de clique no coração
  heart.addEventListener("click", (e) => {
    const rect = heart.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Cria múltiplas partículas
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const offsetX = (Math.random() - 0.5) * 100
        const offsetY = (Math.random() - 0.5) * 100
        createParticle(centerX + offsetX, centerY + offsetY)
      }, i * 100)
    }

    // Efeito de pulsação no coração
    heart.style.transform = "scale(1.3)"
    setTimeout(() => {
      heart.style.transform = "scale(1)"
    }, 200)
  })

  // Partículas flutuantes automáticas
  function createFloatingParticle() {
    const x = Math.random() * window.innerWidth
    const y = window.innerHeight + 50

    const particle = document.createElement("div")
    particle.className = "particle"
    particle.innerHTML = "✨"
    particle.style.left = x + "px"
    particle.style.top = y + "px"
    particle.style.fontSize = "12px"
    particle.style.animation = "float 8s linear forwards"

    particlesContainer.appendChild(particle)

    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    }, 8000)
  }

  // Cria partículas flutuantes a cada 2 segundos
  setInterval(createFloatingParticle, 2000)
})
