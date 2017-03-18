package bean;

import java.util.List;

/**
 * Classe representant un salon
 * 
 * @author Mastersnes
 * 
 */
public class Moi {
	private String titre;
	private List<String> image;
	private List<String> video;
	private String texte;

	public String getTitre() {
		return titre;
	}

	public void setTitre(final String titre) {
		this.titre = titre;
	}

	public List<String> getImage() {
		return image;
	}

	public void setImage(final List<String> image) {
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
