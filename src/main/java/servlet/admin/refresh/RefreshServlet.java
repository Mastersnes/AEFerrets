package servlet.admin.refresh;

import java.io.IOException;

import javax.servlet.ServletException;

import servlet.abstrait.AbstractServlet;
import servlet.abstrait.GeneralResponse;
import bdd.LivreDAO;
import bdd.MoiDAO;
import bdd.NewsDAO;
import bdd.SalonDAO;

/**
 * Controller d'administration permettant de rafraichir le contexte de
 * l'application
 * 
 * @author Snes
 * 
 */
public class RefreshServlet extends AbstractServlet<String, GeneralResponse> {
	private static final long serialVersionUID = -4647019705021722992L;

	@Override
	protected GeneralResponse doGet(final String request) throws ServletException, IOException {
		return null;
	}

	@Override
	protected GeneralResponse doPost(final String request) throws ServletException, IOException {
		LivreDAO.getInstance().refresh();
		NewsDAO.getInstance().refresh();
		SalonDAO.getInstance().refresh();
		MoiDAO.getInstance().refresh();

		final GeneralResponse response = new GeneralResponse();
		response.setCodeRetour(0);
		response.setMessage("Le site a ete rafraichie avec les nouvelles donnees");
		return response;
	}

	@Override
	protected String getRequest(final String data) {
		return null;
	}

}
