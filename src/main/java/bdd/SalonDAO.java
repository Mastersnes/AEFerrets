package bdd;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import utils.Constantes;
import utils.JsonUtil;
import bean.Salon;

import com.google.gson.Gson;

/**
 * DAO D'acces aux Salons
 * 
 * @author snesztler
 *
 */
public class SalonDAO {
    private static SalonDAO instance;
    private final Map<String, List<Salon>> mapSalons = new HashMap<String, List<Salon>>();

    private SalonDAO() {
        refresh();
    }

    /**
     * Singleton
     * 
     * @return
     */
    public static synchronized SalonDAO getInstance() {
        if (instance == null) {
            instance = new SalonDAO();
        }
        return instance;
    }

    /**
     * Permet de raffraichir les données de salons
     */
    public void refresh() {
        final String json = JsonUtil.load(JsonUtil.SALONS_PATH);
        final Gson gson = Constantes.GSON;
        mapSalons.clear();
        @SuppressWarnings("unchecked")
        final Map<String, List<Salon>> salons = gson.fromJson(json, HashMap.class);
        if (salons != null) {
            mapSalons.putAll(salons);
        }
    }

    /**
     * Renvoi la liste des salons d'une date donnée
     * 
     * @param date
     * @return
     */
    public List<Salon> getSalons(final String date) {
        return mapSalons.get(date);
    }
}
