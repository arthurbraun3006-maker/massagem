require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());
app.use(cors());


app.post('/agendamento', async (req, res) => {
    const { nome, telefone } = req.body;

    console.log('nome:', nome);
    console.log('telefone:', telefone);
    console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'arthur.braun3006@gmail.com',
            pass: process.env.EMAIL_PASSWORD
        }
    });
    
    const mailOptions = {
        from: 'arthur.braun3006@gmail.com',
        to: 'arthur.braun3006@gmail.com',
        subject: 'Novo Agendamento de Massagem',
        html: `<img src="https://cdn.vectorstock.com/i/preview-1x/98/37/body-massage-logo-spa-centre-icon-massage-vector-39829837.jpg" alt="Logo da empresa"><h1>Agendamento de Massagem</h1><div style="display: flex; align-items: center;"><img style="width: 75px; height: auto;" src="https://www.freepnglogos.com/uploads/whatsapp-png-logo-1.png"><div><span>Nome: ${nome}</span><br><span>Telefone: ${telefone}</span></div></div>`
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: ' + info.messageID);

    res.json({ message: 'Agendamento recebido com sucesso!' });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});