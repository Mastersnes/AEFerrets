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
}
