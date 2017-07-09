package bdd;

import java.util.ArrayList;
import java.util.List;

import utils.Constantes;
import utils.JsonUtil;
import bean.MarquePage;

import com.google.gson.Gson;

/**
 * DAO D'acces aux marques page
 * 
 * @author snesztler
 * 
 */
public class MarquesPageDAO {
	private static MarquesPageDAO instance;
	private final List<MarquePage> listMarquesPage = new ArrayList<>();

	private MarquesPageDAO() {
		refresh();
	}

	/**
	 * Singleton
	 * 
	 * @return
	 */
	public static synchronized MarquesPageDAO getInstance() {
		if (instance == null) {
			instance = new MarquesPageDAO();
		}
		return instance;
	}

	/**
	 * Permet de raffraichir les donnees
	 */
	public void refresh() {
		final String json = JsonUtil.load(JsonUtil.MARQUES_PAGE_PATH);
		final Gson gson = Constantes.GSON;
		listMarquesPage.clear();
		@SuppressWarnings("unchecked")
		final List<MarquePage> marquesPages = gson.fromJson(json, List.class);
		if (marquesPages != null) {
			listMarquesPage.addAll(marquesPages);
		}
	}

	public List<MarquePage> getListMarquesPage() {
		return listMarquesPage;
	}

}
