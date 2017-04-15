package servlet.list;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import servlet.abstrait.AbstractServlet;
import bdd.Connexion;
import bdd.LivreFreeDAO;
import bean.Livre;

/**
 * Controller permettant de lister les livres disponibles
 * 
 * @author Mayitabel
 * 
 */
public class ListFreeServlet extends AbstractServlet<String, ListServletResponse> {
	private static final long serialVersionUID = -4647019705021722992L;

	@Override
	protected ListServletResponse doGet(final String request) throws ServletException, IOException {
		final ListServletResponse response = new ListServletResponse();

		final List<Livre> listLivre = LivreFreeDAO.getInstance().listLivreFree();
		response.getLivres().addAll(listLivre);

		Connexion.addNew(getClientIpAddr(), "Chargement des livres gratuit");

		return response;
	}

	@Override
	protected ListServletResponse doPost(final String request) throws ServletException, IOException {
		return null;
	}

	@Override
	protected String getRequest(final String data) {
		return null;
	}

}
