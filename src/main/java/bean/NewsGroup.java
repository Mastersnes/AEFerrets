package bean;

import java.util.List;

/**
 * Represente un couple date - news pour l'affichage
 * 
 * @author snesztler
 *
 */
public class NewsGroup {
    private String date;
    private List<News> news;

    /**
     * @return the date
     */
    public String getDate() {
        return date;
    }

    /**
     * @param date
     *            the date to set
     */
    public void setDate(final String date) {
        this.date = date;
    }

    /**
     * @return the news
     */
    public List<News> getNews() {
        return news;
    }

    /**
     * @param news
     *            the news to set
     */
    public void setNews(final List<News> news) {
        this.news = news;
    }
}
