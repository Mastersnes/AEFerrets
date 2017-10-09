package bdd;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import utils.Constantes;
import utils.JsonUtil;
import bean.Action;
import bean.User;

import com.google.gson.Gson;

public class Connexion {
    private static Connexion instance;
    private final Map<String, User> connexions = new HashMap<>();

    private Connexion() {
        refresh();
    }

    /**
     * Singleton
     * 
     * @return
     */
    public static synchronized Connexion getInstance() {
        if (instance == null) {
            instance = new Connexion();
        }
        return instance;
    }

    /**
     * Permet de raffraichir les données de connexion
     */
    public void refresh() {
        final String json = JsonUtil.load(JsonUtil.CONNEXION_PATH);
        final Gson gson = Constantes.GSON;
        connexions.clear();
        @SuppressWarnings("unchecked")
        final Map<String, User> listConnexions = gson.fromJson(json, Map.class);
        if (listConnexions != null) {
            connexions.putAll(listConnexions);
        }
    }

    /**
     * Permet de sauvegarder les donnees utilisateur
     * 
     * @throws GeneralException
     */
    public void save() {
        final Gson gson = Constantes.GSON;
        final String json = gson.toJson(connexions);
        JsonUtil.save(JsonUtil.CONNEXION_PATH, json);
    }

    public void addNew(final String ip, final String where) {
		User user = connexions.get(ip);
		if (user == null) {
			user = new User();
			connexions.put(ip, user);
		}
		user.setIp(ip);

		Action action = user.getActions().get(where);
		if (action == null) {
			action = new Action();
			user.getActions().put(where, action);
		}
		action.setDate(Constantes.FORMAT.format(new Date()));
		action.setNombre(action.getNombre() + 1);

        save();
	}

    public Map<String, User> getConnexions() {
        return connexions;
    }
}
