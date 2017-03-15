package bean;

/**
 * Classe representant un salon
 * 
 * @author Mastersnes
 * 
 */
public class Salon {
    private String date;
    private String titre;
    private String image;
    private String video;
    private String texte;

    public String getTitre() {
        return titre;
    }

    public void setTitre(final String titre) {
        this.titre = titre;
    }

    public String getImage() {
        return image;
    }

    public void setImage(final String image) {
        this.image = image;
    }

    public String getTexte() {
        return texte;
    }

    public void setTexte(final String texte) {
        this.texte = texte;
    }

    /**
     * @return the video
     */
    public String getVideo() {
        return video;
    }

    /**
     * @param video
     *            the video to set
     */
    public void setVideo(final String video) {
        this.video = video;
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
}
