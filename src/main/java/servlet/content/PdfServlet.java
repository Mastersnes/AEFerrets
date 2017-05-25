package servlet.content;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.logging.Level;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utils.Logger;

/**
 * Servlet de redirection de pdf
 * 
 * @author Mastersnes
 * 
 */
public class PdfServlet extends HttpServlet {
	private static final long serialVersionUID = -5989684969364706256L;
	public static final String PDF_PATH = "./AEFerrets/pdf/";
	private static Logger LOGGER = new Logger(PdfServlet.class.getName());

	@Override
	protected void doGet(final HttpServletRequest req, final HttpServletResponse response) throws ServletException,
			IOException {

		final String pdf = req.getPathInfo();

		final File f = new File(PDF_PATH + pdf);
		if (f.exists()) {
			response.setContentType("application/pdf");

			final OutputStream out = response.getOutputStream();
			FileInputStream in = null;
			try {
				in = new FileInputStream(f);
				int bytes;
				while ((bytes = in.read()) != -1) {
					out.write(bytes);
				}
			} catch (final IOException e) {
				LOGGER.log(Level.SEVERE, "Impossible de charger le pdf : " + pdf);
			} finally {
				if (out != null) {
					out.close();
				}
				if (in != null) {
					in.close();
				}
			}
		} else {
			LOGGER.log(Level.WARNING, "le pdf : " + pdf + " n'existe pas");
		}
	}
}
