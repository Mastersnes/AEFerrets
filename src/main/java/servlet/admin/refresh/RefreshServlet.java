package servlet.admin.refresh;

import java.io.IOException;

import javax.servlet.ServletException;

import servlet.abstrait.AbstractServlet;
import bdd.Connexion;
import bdd.LivreDAO;
import bdd.NewsDAO;

/**
 * Controller d'administration permettant de rafraichir le contexte de l'application
 * 
 * @author Snes
 * 
 */
public class RefreshServlet extends AbstractServlet<String, String> {
    private static final long serialVersionUID = -4647019705021722992L;

    @Override
    protected String doGet(final String request) throws ServletException, IOException {
        LivreDAO.getInstance().refresh();
        NewsDAO.getInstance().refresh();
        return "DONE";
    }

    @Override
    protected String doPost(final String request) throws ServletException, IOException {
        return null;
    }

    @Override
    protected String getRequest(final String data) {
        return null;
    }

}
