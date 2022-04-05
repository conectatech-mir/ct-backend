require('dotenv').config();
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENGRID_API_KEY);

const sendEmail = async(user) => {
  try {
    await sendgrid.send({
      to: user.email,
      from: 'jr.almeyda7@gmail.com',
      subject: `Bienvenidx a Conectatech`,
      text: `Hola ${user.firstName} te damos la bienvenida a conectatech`
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