package servlet.moi;

import servlet.abstrait.GeneralResponse;
import bean.Moi;

/**
 * Reponse du controller MoiServlet
 * 
 * @author Snes
 * 
 */
public class MoiServletResponse extends GeneralResponse {
    private Moi moi;

    /**
     * @return the moi
     */
    public Moi getMoi() {
        return moi;
    }

    /**
     * @param moi
     *            the moi to set
     */
    public void setMoi(final Moi moi) {
        this.moi = moi;
    }
}
