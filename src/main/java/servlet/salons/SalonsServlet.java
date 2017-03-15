package servlet.salons;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import servlet.abstrait.AbstractServlet;
import utils.Constantes;
import bdd.Connexion;
import bdd.SalonDAO;
import bean.Salon;

/**
 * Controller permettant de lister les salons disponibles
 * 
 * @author Mayitabel
 * 
 */
public class SalonsServlet extends AbstractServlet<SalonsServletRequest, SalonsServletResponse> {
    private static final long serialVersionUID = -4647019705021722992L;

    @Override
    protected SalonsServletResponse doGet(final SalonsServletRequest request) throws ServletException, IOException {
        return null;
    }

    @Override
    protected SalonsServletResponse doPost(final SalonsServletRequest request) throws ServletException,
            IOException {
        final String search = request.getDate();
        final SalonsServletResponse response = new SalonsServletResponse();

        final SalonDAO dao = SalonDAO.getInstance();

        /**
         * Recuperation de la liste des salons pour la date recherchée
         */
        final List<Salon> salons = dao.getSalons(search);
        response.getSalons().addAll(salons);

        Connexion.addNew(getClientIpAddr(), "Chargement des salons : " + search);

        return response;
    }

    @Override
    protected SalonsServletRequest getRequest(final String data) {
        return Constantes.GSON.fromJson(data, SalonsServletRequest.class);
    }

}
