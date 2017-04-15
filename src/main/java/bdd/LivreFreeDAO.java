package bdd;

import java.util.ArrayList;
import java.util.List;

import utils.Constantes;
import utils.JsonUtil;
import bean.Livre;

import com.google.gson.Gson;

/**
 * DAO D'acces aux livres gratuit
 * 
 * @author snesztler
 * 
 */
public class LivreFreeDAO {
	private static LivreFreeDAO instance;
	private final List<Livre> listLivreFree = new ArrayList<Livre>();

	private LivreFreeDAO() {
		refresh();
	}

	/**
	 * Singleton
	 * 
	 * @return
	 */
	public static synchronized LivreFreeDAO getInstance() {
		if (instance == null) {
			instance = new LivreFreeDAO();
		}
		return instance;
	}

	/**
	 * Permet de raffraichir les donn�es de livres
	 */
	public void refresh() {
		final String json = JsonUtil.load(JsonUtil.LIVRE_FREE_PATH);
		final Gson gson = Constantes.GSON;
		listLivreFree.clear();
		@SuppressWarnings("unchecked")
		final List<Livre> livres = gson.fromJson(json, List.class);
		if (livres != null) {
			listLivreFree.addAll(livres);
		}
	}

	/**
	 * Envoi la liste des livres
	 * 
	 * @return
	 */
	public List<Livre> listLivreFree() {
		return listLivreFree;
	}

	/**
	 * Renvoi le livre donn�
	 * 
	 * @param titre
	 * @return
	 */
	public Livre getLivreFree(final String titre) {
		for (final Livre livre : listLivreFree) {
			if (titre.equals(livre.getTitre())) {
				return livre;
			}
		}
		return listLivreFree.get(0);
	}
}
