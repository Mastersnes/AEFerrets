package servlet.marquesPage;

import java.io.IOException;

import javax.servlet.ServletException;

import servlet.abstrait.AbstractServlet;
import bdd.UserActionDao;
import bdd.MarquesPageDAO;

/**
 * Controller permettant de lister les marques page disponibles
 * 
 * @author Mayitabel
 * 
 */
public class MarquesPageServlet extends AbstractServlet<String, MarquesPageServletResponse> {
	private static final long serialVersionUID = -4647019705021722992L;

	@Override
	protected MarquesPageServletResponse doGet(final String request) throws ServletException, IOException {
		return null;
	}

	@Override
	protected MarquesPageServletResponse doPost(final String request) throws ServletException, IOException {
		final MarquesPageServletResponse response = new MarquesPageServletResponse();

		final MarquesPageDAO dao = MarquesPageDAO.getInstance();

		/**
		 * Recuperation de la liste des salons pour la date recherchee
		 */
		response.setMarquesPage(dao.getListMarquesPage());

        UserActionDao.getInstance().addNew(getClientIpAddr(), "Chargement des marques page");

		return response;
	}

	@Override
	protected String getRequest(final String data) {
		return null;
	}

}
