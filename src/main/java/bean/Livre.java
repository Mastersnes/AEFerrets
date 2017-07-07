package bean;

/**
 * Classe representant un livre
 * 
 * @author Mastersnes
 * 
 */
public class Livre {
	private String titre;
	private String premiere;
	private String quatrieme;
	private String resume;
    private Float price;
    private Float poids;

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
	 * @return the premiere
	 */
	public String getPremiere() {
		return premiere;
	}

	/**
	 * @param premiere
	 *            the premiere to set
	 */
	public void setPremiere(final String premiere) {
		this.premiere = premiere;
	}

	/**
	 * @return the quatrieme
	 */
	public String getQuatrieme() {
		return quatrieme;
	}

	/**
	 * @param quatrieme
	 *            the quatrieme to set
	 */
	public void setQuatrieme(final String quatrieme) {
		this.quatrieme = quatrieme;
	}

	/**
	 * @return the resume
	 */
	public String getResume() {
		return resume;
	}

	/**
	 * @param resume
	 *            the resume to set
	 */
	public void setResume(final String resume) {
		this.resume = resume;
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
     * @return the poids
     */
    public Float getPoids() {
        return poids;
    }

    /**
     * @param poids
     *            the poids to set
     */
    public void setPoids(final Float poids) {
        this.poids = poids;
    }
}
