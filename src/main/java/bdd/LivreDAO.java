package bdd;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import utils.Constantes;
import utils.JsonUtil;
import bean.Livre;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

/**
 * DAO D'acces aux News
 * 
 * @author snesztler
 *
 */
public class LivreDAO {
    private static LivreDAO instance;
    private final List<Livre> listLivre = new ArrayList<Livre>();

    private LivreDAO() {
        refresh();
    }

    /**
     * Singleton
     * 
     * @return
     */
    public static synchronized LivreDAO getInstance() {
        if (instance == null) {
            instance = new LivreDAO();
        }
        return instance;
    }

    /**
     * Permet de raffraichir les données de livres
     */
    public void refresh() {
        final String json = JsonUtil.load(JsonUtil.LIVRE_PATH);
        final Gson gson = Constantes.GSON;
        listLivre.clear();

        final Type type = new TypeToken<List<Livre>>(){}.getType();
        final List<Livre> livres = gson.fromJson(json, type);
        if (livres != null) {
            listLivre.addAll(livres);
        }
    }

    /**
     * Envoi la liste des livres
     * 
     * @return
     */
    public List<Livre> listLivre() {
        return listLivre;
    }

    /**
     * Renvoi le livre donné
     * 
     * @param titre
     * @return
     */
    public Livre getLivre(final String titre) {
        for (final Livre livre : listLivre) {
            if (titre.equals(livre.getTitre())) {
                return livre;
            }
        }
        return listLivre.get(0);
    }
}
