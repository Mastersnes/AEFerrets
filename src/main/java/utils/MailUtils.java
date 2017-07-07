package utils;

import java.util.logging.Level;

import com.sendgrid.SendGrid;
import com.sendgrid.SendGridException;

public class MailUtils extends Thread {
	private static Logger LOGGER = new Logger(MailUtils.class.getName());

    private String to;
    private String subject;
    private String message;

    public void sendMail(final String to, final String subject, final String message) {
        this.to = to;
        this.subject = subject;
        this.message = message;
        start();
    }

    @Override
    public void run() {
        final String userName = System.getenv("SENDGRID_USERNAME");
        final String password = System.getenv("SENDGRID_PASSWORD");
        final SendGrid sendgrid = new SendGrid(userName, password);

        final SendGrid.Email email = new SendGrid.Email();

        email.addTo(to);
        email.setFrom("ae.ferrets@gmail.com");
        email.setSubject(subject);
        email.setHtml(message);

        try {
            final SendGrid.Response reponse = sendgrid.send(email);
            LOGGER.log(Level.INFO, "---Mail---");
            LOGGER.log(Level.INFO, "Mail envoye a  : " + to);
            LOGGER.log(Level.INFO, "Sujet : " + subject);
            LOGGER.log(Level.INFO, "Message : " + message);
            LOGGER.log(Level.INFO, "----------");
            if (reponse != null) {
                LOGGER.log(Level.INFO, reponse.getCode() + " : " + reponse.getMessage());
            }
        } catch (final SendGridException e) {
            LOGGER.log(Level.INFO, "Exception : " + e);
        }
    }
}
