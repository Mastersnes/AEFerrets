package servlet.news;

import java.io.IOException;
import java.util.List;
import java.util.TreeMap;

import javax.servlet.ServletException;

import servlet.abstrait.AbstractServlet;
import utils.Constantes;
import utils.JsonUtil;
import bdd.Connexion;
import bean.News;

import com.google.gson.Gson;

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

		final String json = JsonUtil.load(JsonUtil.NEWS_PATH);
		final Gson gson = Constantes.GSON;
		@SuppressWarnings("unchecked")
		final TreeMap<String, List<News>> mapNews = gson.fromJson(json, TreeMap.class);

		final List<String> listDate = response.getDate();
		listDate.addAll(mapNews.keySet());

		if (!mapNews.containsKey(search)) {
			search = mapNews.lastKey();
		}

		response.getNews().addAll(mapNews.get(search));
		final int index = listDate.indexOf(search);

		if (index > 0) {
			response.setPreview(listDate.get(index - 1));
		}
		if (index < listDate.size() - 1) {
			response.setNext(listDate.get(index + 1));
		}

		Connexion.addNew(getClientIpAddr(), "Chargement des news : " + search);

		return response;
	}

	@Override
	protected NewsServletRequest getRequest(final String data) {
		return Constantes.GSON.fromJson(data, NewsServletRequest.class);
	}

}
