package servlet.achat;

import java.io.IOException;

import javax.servlet.ServletException;

import servlet.abstrait.AbstractServlet;
import servlet.abstrait.GeneralResponse;
import utils.Constantes;

/**
 * Controller permettant de lister les news disponibles
 * 
 * @author Mayitabel
 * 
 */
public class AchatServlet extends AbstractServlet<AchatServletRequest, GeneralResponse> {
	private static final long serialVersionUID = -4647019705021722992L;

	@Override
    protected GeneralResponse doGet(final AchatServletRequest request) throws ServletException, IOException {
		return null;
	}

	@Override
    protected GeneralResponse doPost(final AchatServletRequest request) throws ServletException, IOException {
        final GeneralResponse response = new GeneralResponse();

		return response;
	}

	@Override
	protected AchatServletRequest getRequest(final String data) {
		return Constantes.GSON.fromJson(data, AchatServletRequest.class);
	}

}
