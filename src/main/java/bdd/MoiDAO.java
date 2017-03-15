package bdd;

import utils.Constantes;
import utils.JsonUtil;
import bean.Moi;

import com.google.gson.Gson;

/**
 * DAO D'acces aux donnees de biographie
 * 
 * @author snesztler
 *
 */
public class MoiDAO {
    private static MoiDAO instance;
    private Moi moi;

    private MoiDAO() {
        refresh();
    }

    /**
     * Singleton
     * 
     * @return
     */
    public static synchronized MoiDAO getInstance() {
        if (instance == null) {
            instance = new MoiDAO();
        }
        return instance;
    }

    /**
     * Permet de raffraichir les données de salons
     */
    public void refresh() {
        final String json = JsonUtil.load(JsonUtil.MOI_PATH);
        final Gson gson = Constantes.GSON;
        moi = gson.fromJson(json, Moi.class);
    }

    /**
     * Renvoi la biographie
     * 
     * @param date
     * @return
     */
    public Moi getMoi() {
        return moi;
    }
}
