package servlet.admin.save.news;

import java.util.List;

import filter.admin.AdminFilterRequest;

/**
 * requete du controller SaveNewsServlet
 * 
 * @author Snes
 * 
 */
public class SaveNewsServletRequest extends AdminFilterRequest {
    private int index;
    private String date;
    private String titre;
    private String texte;
    private List<String> image;
    private List<String> video;

    /**
     * @return the index
     */
    public int getIndex() {
        return index;
    }

    /**
     * @param index
     *            the index to set
     */
    public void setIndex(final int index) {
        this.index = index;
    }

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
     * @return the titre
     */
    public String getTitre() {
        return titre;
    }

    /**
     * @param titre
     *            the titre to set
     */
    public void setTitre(final String titre) {
        this.titre = titre;
    }

    /**
     * @return the texte
     */
    public String getTexte() {
        return texte;
    }

    /**
     * @param texte
     *            the texte to set
     */
    public void setTexte(final String texte) {
        this.texte = texte;
    }

    /**
     * @return the image
     */
    public List<String> getImage() {
        return image;
    }

    /**
     * @param image
     *            the image to set
     */
    public void setImage(final List<String> image) {
        this.image = image;
    }

    /**
     * @return the video
     */
    public List<String> getVideo() {
        return video;
    }

    /**
     * @param video
     *            the video to set
     */
    public void setVideo(final List<String> video) {
        this.video = video;
    }
}
