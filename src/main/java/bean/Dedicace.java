package bean;

/**
 * Classe representant un livre
 * 
 * @author Mastersnes
 * 
 */
public class Dedicace {
    private String id;
    private String titre;
    private boolean activeDedicace;
    private String dedicace;

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
     * @return the activeDedicace
     */
    public boolean isActiveDedicace() {
        return activeDedicace;
    }

    /**
     * @param activeDedicace
     *            the activeDedicace to set
     */
    public void setActiveDedicace(final boolean activeDedicace) {
        this.activeDedicace = activeDedicace;
    }

    /**
     * @return the dedicace
     */
    public String getDedicace() {
        return dedicace;
    }

    /**
     * @param dedicace
     *            the dedicace to set
     */
    public void setDedicace(final String dedicace) {
        this.dedicace = dedicace;
    }
}
