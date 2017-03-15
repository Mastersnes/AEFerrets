package servlet.salons;

import java.util.ArrayList;
import java.util.List;

import servlet.abstrait.GeneralResponse;
import bean.Salon;

/**
 * Reponse du controller SalonsServlet
 * 
 * @author Snes
 * 
 */
public class SalonsServletResponse extends GeneralResponse {
    private final List<Salon> salons = new ArrayList<>();

    /**
     * @return the salons
     */
    public List<Salon> getSalons() {
        return salons;
    }
}
