package bean;

/**
 * Classe representant l'action d'un utilisateur sur le site
 * 
 * @author Mastersnes
 * 
 */
public class Action {
    private String name;
	private String date;
	private int nombre;

	/**
	 * @return the date
	 */
	public final String getDate() {
		return date;
	}

	/**
	 * @param date
	 *            the date to set
	 */
	public final void setDate(final String date) {
		this.date = date;
	}

	/**
	 * @return the nombre
	 */
	public final int getNombre() {
		return nombre;
	}

	/**
	 * @param nombre
	 *            the nombre to set
	 */
	public final void setNombre(final int nombre) {
		this.nombre = nombre;
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
}
