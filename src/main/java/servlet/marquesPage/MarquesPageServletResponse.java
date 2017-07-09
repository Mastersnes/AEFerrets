package servlet.marquesPage;

import java.util.List;

import servlet.abstrait.GeneralResponse;
import bean.MarquePage;

/**
 * Reponse du controller MarquesPageServlet
 * 
 * @author Snes
 * 
 */
public class MarquesPageServletResponse extends GeneralResponse {
	private List<MarquePage> marquesPage;

	/**
	 * @return the marquesPage
	 */
	public List<MarquePage> getMarquesPage() {
		return marquesPage;
	}

	/**
	 * @param marquesPage
	 *            the marquesPage to set
	 */
	public void setMarquesPage(final List<MarquePage> marquesPage) {
		this.marquesPage = marquesPage;
	}
}
