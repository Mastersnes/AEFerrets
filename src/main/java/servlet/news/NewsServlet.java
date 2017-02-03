package servlet.news;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import servlet.abstrait.AbstractServlet;
import utils.Constantes;
import bdd.Connexion;
import bdd.NewsDAO;
import bean.NewsGroup;

/**
 * Controller permettant de lister les news disponibles
 * 
 * @author Mayitabel
 * 
 */
public class NewsServlet extends AbstractServlet<NewsServletRequest, NewsServletResponse> {
	private static final long serialVersionUID = -4647019705021722992L;

	@Override
	protected NewsServletResponse doGet(final NewsServletRequest request) throws ServletException, IOException {
		return null;
	}

	@Override
	protected NewsServletResponse doPost(final NewsServletRequest request) throws ServletException, IOException {
        String search = request.getDate();
		final NewsServletResponse response = new NewsServletResponse();

		final NewsDAO dao = NewsDAO.getInstance();
		
        /**
         * Recuperation de la liste des dates
         */
        final List<String> listDate = response.getDate();
		listDate.addAll(dao.listDate());

        /**
         * Recuperation de la liste des news pour la date recherchée
         */
        final NewsGroup groupSearch = dao.getNews(search);
        search = groupSearch.getDate();
        response.getNews().addAll(groupSearch.getNews());

        /**
         * Recuperation des index suivant et precedant
         */
        final int index = listDate.indexOf(search);
		if (index > 0) {
            response.setNext(listDate.get(index - 1));
		}
		if (index < listDate.size() - 1) {
            response.setPreview(listDate.get(index + 1));
		}
		
        Connexion.addNew(getClientIpAddr(), "Chargement des news : " + search);

		return response;
	}

	@Override
	protected NewsServletRequest getRequest(final String data) {
		return Constantes.GSON.fromJson(data, NewsServletRequest.class);
	}

}
