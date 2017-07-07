package servlet.achat;

import java.util.List;

import bean.Article;
import bean.Dedicace;

/**
 * requete du controller AchatServlet
 * 
 * @author Snes
 * 
 */
public class AchatServletRequest {
    private String nom;
    private String prenom;
    private String adresse;
    private String cp;
    private String ville;
    private String email;
    private String commentaire;
    private List<Dedicace> dedicaces;
    private List<Article> commande;

    /**
     * @return the nom
     */
    public String getNom() {
        return nom;
    }

    /**
     * @param nom
     *            the nom to set
     */
    public void setNom(final String nom) {
        this.nom = nom;
    }

    /**
     * @return the prenom
     */
    public String getPrenom() {
        return prenom;
    }

    /**
     * @param prenom
     *            the prenom to set
     */
    public void setPrenom(final String prenom) {
        this.prenom = prenom;
    }

    /**
     * @return the adresse
     */
    public String getAdresse() {
        return adresse;
    }

    /**
     * @param adresse
     *            the adresse to set
     */
    public void setAdresse(final String adresse) {
        this.adresse = adresse;
    }

    /**
     * @return the cp
     */
    public String getCp() {
        return cp;
    }

    /**
     * @param cp
     *            the cp to set
     */
    public void setCp(final String cp) {
        this.cp = cp;
    }

    /**
     * @return the ville
     */
    public String getVille() {
        return ville;
    }

    /**
     * @param ville
     *            the ville to set
     */
    public void setVille(final String ville) {
        this.ville = ville;
    }

    /**
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email
     *            the email to set
     */
    public void setEmail(final String email) {
        this.email = email;
    }

    /**
     * @return the commentaire
     */
    public String getCommentaire() {
        return commentaire;
    }

    /**
     * @param commentaire
     *            the commentaire to set
     */
    public void setCommentaire(final String commentaire) {
        this.commentaire = commentaire;
    }

    /**
     * @return the dedicace
     */
    public List<Dedicace> getDedicaces() {
        return dedicaces;
    }

    /**
     * @param dedicace the dedicace to set
     */
    public void setDedicaces(final List<Dedicace> dedicaces) {
        this.dedicaces = dedicaces;
    }

    /**
     * @return the commande
     */
    public List<Article> getCommande() {
        return commande;
    }

    /**
     * @param commande the commande to set
     */
    public void setCommande(List<Article> commande) {
        this.commande = commande;
    }
}
