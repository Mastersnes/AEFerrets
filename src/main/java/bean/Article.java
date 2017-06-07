package bean;

public class Article {
    private String titre;
    private String link;
    private Double price;

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
     * @return the link
     */
    public String getLink() {
        return link;
    }

    /**
     * @param link
     *            the link to set
     */
    public void setLink(final String link) {
        this.link = link;
    }

    /**
     * @return the price
     */
    public Double getPrice() {
        return price;
    }

    /**
     * @param price
     *            the price to set
     */
    public void setPrice(final Double price) {
        this.price = price;
    }

}
