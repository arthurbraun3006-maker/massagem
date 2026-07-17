async function enviarAgendamento(nome, telefone) {
    const response = await fetch('http://localhost:3000/agendamento',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, telefone })
    })

    const data = await response.json()

    console.log(data)
}

const formulario = document.getElementById('form-agendamento')

formulario.addEventListener('submit', async (event) => {
    event.preventDefault()

    const nome = document.getElementById('nome').value
    const telefone = document.getElementById('telefone').value

    await enviarAgendamento(nome, telefone)
})