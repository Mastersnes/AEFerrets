package servlet.list;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import servlet.abstrait.AbstractServlet;
import utils.Constantes;
import utils.JsonUtil;
import bdd.Connexion;

import com.google.gson.Gson;

/**
 * Controller permettant de lister les livres disponibles
 * 
 * @author Mayitabel
 * 
 */
public class ListServlet extends AbstractServlet<String, ListServletResponse> {
	private static final long serialVersionUID = -4647019705021722992L;

	@Override
	protected ListServletResponse doGet(final String request) throws ServletException, IOException {
		final ListServletResponse response = new ListServletResponse();

		final String json = JsonUtil.load(JsonUtil.LIVRE_PATH);

		final Gson gson = Constantes.GSON;
		@SuppressWarnings("unchecked")
		final List<Object> livres = gson.fromJson(json, List.class);
		response.getLivres().addAll(livres);

		Connexion.addNew(getClientIpAddr(), "Connexion");

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
