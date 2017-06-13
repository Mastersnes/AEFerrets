package servlet.admin.save.news;

import java.io.IOException;

import javax.servlet.ServletException;

import servlet.abstrait.AbstractServlet;
import servlet.abstrait.GeneralResponse;
import utils.Constantes;

/**
 * Controller d'administration permettant de creer ou modifier une news
 * 
 * @author Snes
 * 
 */
public class SaveNewsServlet extends AbstractServlet<SaveNewsServletRequest, GeneralResponse> {
	private static final long serialVersionUID = -4647019705021722992L;

	@Override
    protected GeneralResponse doGet(final SaveNewsServletRequest request) throws ServletException, IOException {
		return null;
	}

	@Override
    protected GeneralResponse doPost(final SaveNewsServletRequest request) throws ServletException, IOException {
		final GeneralResponse response = new GeneralResponse();

        log("HERE");

		return response;
	}

	@Override
    protected SaveNewsServletRequest getRequest(final String data) {
        return Constantes.GSON.fromJson(data, SaveNewsServletRequest.class);
	}

}
