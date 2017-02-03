package bdd;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import utils.Constantes;
import utils.JsonUtil;
import bean.News;
import bean.NewsGroup;

import com.google.gson.Gson;

/**
 * DAO D'acces aux News
 * 
 * @author snesztler
 *
 */
public class NewsDAO {
    private static NewsDAO instance;
    private final Map<String, List<News>> mapNews = new TreeMap<String, List<News>>();

    private NewsDAO() {
        refresh();
    }

    /**
     * Singleton
     * 
     * @return
     */
    public static synchronized NewsDAO getInstance() {
        if (instance == null) {
            instance = new NewsDAO();
        }
        return instance;
    }

    /**
     * Permet de raffraichir les données de news
     */
    public void refresh() {
        final String json = JsonUtil.load(JsonUtil.NEWS_PATH);
        final Gson gson = Constantes.GSON;
        mapNews.clear();
        @SuppressWarnings("unchecked")
        final Map<String, List<News>> news = gson.fromJson(json, TreeMap.class);
        if (news != null) {
            mapNews.putAll(news);
        }
    }

    /**
     * Envoi la liste des dates de news
     * 
     * @return
     */
    public List<String> listDate() {
        final List<String> listDate = new ArrayList<String>(mapNews.keySet());
        Collections.sort(listDate, Constantes.DATE_COMPARATOR);
        return listDate;
    }

    /**
     * Renvoi la liste des news d'une date donnée
     * 
     * @param date
     * @return
     */
    public NewsGroup getNews(final String date) {
        String dateSearch = date;
        if (!mapNews.containsKey(date)) {
            dateSearch = (String) listDate().toArray()[0];
        }
        final NewsGroup newsGroup = new NewsGroup();
        newsGroup.setDate(dateSearch);
        newsGroup.setNews(mapNews.get(dateSearch));
        
        return newsGroup;
    }
}
