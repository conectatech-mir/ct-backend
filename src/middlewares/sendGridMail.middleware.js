require('dotenv').config();
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENGRID_API_KEY);

const sendEmail = async(user, profesional) => {
  try {
    await sendgrid.send({
      to: user.email,
      from: 'jr.almeyda7@gmail.com',
      subject: `Problema resuelto - CONECTATECH`,
      text: `Hola ${user.firstName}, te saluda Conectatech, te informamos que el profesional
            ${profesional.firstName} ha aceptado tu problema para darle solución,
            puedes comunicarte con él a través del siguiente email: ${profesional.email}`
    });
    console.log('Mensaje exitoso');
  } catch (error) {
    console.log('error', error);
    if(error.response){
      console.error(error.response.body);
    }
  }
}

module.exports = {
  sendEmail
}