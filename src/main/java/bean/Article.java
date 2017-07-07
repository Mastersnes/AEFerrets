package bean;

/**
 * Classe representant un livre
 * 
 * @author Mastersnes
 * 
 */
public class Article {
    private String id;
    private String name;
    private Float price;
    private boolean needDedicace;

    /**
     * @return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id
     *            the id to set
     */
    public void setId(final String id) {
        this.id = id;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name
     *            the name to set
     */
    public void setName(final String name) {
        this.name = name;
    }

    /**
     * @return the price
     */
    public Float getPrice() {
        return price;
    }

    /**
     * @param price
     *            the price to set
     */
    public void setPrice(final Float price) {
        this.price = price;
    }

    /**
     * @return the needDedicace
     */
    public boolean isNeedDedicace() {
        return needDedicace;
    }

    /**
     * @param needDedicace
     *            the needDedicace to set
     */
    public void setNeedDedicace(final boolean needDedicace) {
        this.needDedicace = needDedicace;
    }
}
