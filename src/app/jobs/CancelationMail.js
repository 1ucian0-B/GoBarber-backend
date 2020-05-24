import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Email from '../../lib/Email';

class CancelationMail {
  get key() {
    return 'CancelationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    console.log('A fila executou ');

    await Email.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.Email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancelation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às' H:mm'h' ",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancelationMail();
