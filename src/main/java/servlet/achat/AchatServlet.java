package servlet.achat;

import java.io.IOException;
import java.util.logging.Level;

import javax.servlet.ServletException;

import servlet.abstrait.AbstractServlet;
import servlet.abstrait.GeneralResponse;
import utils.Constantes;
import utils.Logger;
import utils.MailUtils;
import bean.Article;
import bean.Dedicace;

/**
 * Controller permettant de lister les news disponibles
 * 
 * @author Mayitabel
 * 
 */
public class AchatServlet extends AbstractServlet<AchatServletRequest, GeneralResponse> {
	private static final long serialVersionUID = -4647019705021722992L;

	private static Logger LOGGER = new Logger(AchatServlet.class.getName());

	@Override
	protected GeneralResponse doGet(final AchatServletRequest request) throws ServletException, IOException {
		return null;
	}

	@Override
	protected GeneralResponse doPost(final AchatServletRequest request) throws ServletException, IOException {
		final GeneralResponse response = new GeneralResponse();

		final String subject = "Mail recapitulatif - Ne pas repondre";
		final StringBuilder message = new StringBuilder();
		message.append("Bonjour, vous avez un nouvel achat !<br/>");
		message.append("Nom : ").append(request.getNom()).append("<br/>");
		message.append("Prenom : ").append(request.getPrenom()).append("<br/>");
		message.append("Adresse : ").append(request.getAdresse()).append("<br/>");
		message.append("Code Postal : ").append(request.getCp()).append("<br/>");
		message.append("Ville : ").append(request.getVille()).append("<br/>");
		message.append("Email : ").append(request.getEmail()).append("<br/>");
		message.append("Commentaire : ").append(request.getCommentaire()).append("<br/>");

		message.append("<br/>A effectu&eacute; la commande suivante : <br/>");
		for (final Article article : request.getCommande()) {
			message.append("---------------------<br/>");
			message.append("Article : ").append(article.getName()).append("<br/>");
			message.append("---------------------<br/>");
		}

		message.append("<br/>Avec les demandes de dedicaces suivantes : <br/>");

		for (final Dedicace dedicace : request.getDedicaces()) {
			message.append("---------------------<br/>");
			if (dedicace.isActiveDedicace()) {
				message.append("Dedicace du livre : ").append(dedicace.getTitre()).append("<br/>");
				message.append("Dedicace Pour : ").append(dedicace.getDedicace()).append("<br/>");
			} else {
				message.append("Ne pas faire de dedicace pour : ").append(dedicace.getTitre()).append("<br/>");
			}
			message.append("---------------------<br/>");
		}

		message.append("<br/>Ceci est un message automatique, merci de ne pas y repondre.");

		LOGGER.log(Level.INFO, message.toString());

		final MailUtils mailUtils = new MailUtils();
		mailUtils.sendMail("ae.ferrets@gmail.com", subject, message.toString());

		return response;
	}

	@Override
	protected AchatServletRequest getRequest(final String data) {
		return Constantes.GSON.fromJson(data, AchatServletRequest.class);
	}

}
