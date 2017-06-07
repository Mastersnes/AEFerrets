package bean;

import java.util.List;

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
    private List<Article> papiers;
    private List<Article> ebooks;

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
     * @return the papiers
     */
    public List<Article> getPapiers() {
        return papiers;
    }

    /**
     * @param papiers
     *            the papiers to set
     */
    public void setPapiers(final List<Article> papiers) {
        this.papiers = papiers;
    }

    /**
     * @return the ebooks
     */
    public List<Article> getEbooks() {
        return ebooks;
    }

    /**
     * @param ebooks
     *            the ebooks to set
     */
    public void setEbooks(final List<Article> ebooks) {
        this.ebooks = ebooks;
    }
}
