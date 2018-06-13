package servlet.moi;

import java.io.IOException;

import javax.servlet.ServletException;

import servlet.abstrait.AbstractServlet;
import bdd.UserActionDao;
import bdd.MoiDAO;

/**
 * Controller permettant de lister les salons disponibles
 * 
 * @author Mayitabel
 * 
 */
public class MoiServlet extends AbstractServlet<String, MoiServletResponse> {
    private static final long serialVersionUID = -4647019705021722992L;

    @Override
    protected MoiServletResponse doGet(final String request) throws ServletException, IOException {
        return null;
    }

    @Override
    protected MoiServletResponse doPost(final String request) throws ServletException, IOException {
        final MoiServletResponse response = new MoiServletResponse();

        final MoiDAO dao = MoiDAO.getInstance();

        /**
         * Recuperation de la liste des salons pour la date recherchée
         */
        response.setMoi(dao.getMoi());

        UserActionDao.getInstance().addNew(getClientIpAddr(), "Chargement de la biographie");

        return response;
    }

    @Override
    protected String getRequest(final String data) {
        return null;
    }

}
