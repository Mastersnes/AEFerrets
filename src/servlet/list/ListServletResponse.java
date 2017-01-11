package servlet.list;

import java.util.ArrayList;
import java.util.List;

import servlet.abstrait.GeneralResponse;

/**
 * Reponse du controller ListServlet
 * 
 * @author Mayitabel
 * 
 */
public class ListServletResponse extends GeneralResponse {
	private final List<Object> livres = new ArrayList<>();

	/**
	 * getter
	 * 
	 * @return
	 */
	public List<Object> getLivres() {
		return livres;
	}

}
