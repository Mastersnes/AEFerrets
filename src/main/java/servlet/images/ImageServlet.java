package servlet.images;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.logging.Level;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utils.Logger;

/**
 * Servlet de redirection d'image
 * 
 * @author Mastersnes
 * 
 */
public class ImageServlet extends HttpServlet {
	private static final long serialVersionUID = -5989684969364706256L;
	public static final String IMAGE_PATH = "./AEFerrets/img/";
	private static Logger LOGGER = new Logger(ImageServlet.class.getName());

	@Override
	protected void doGet(final HttpServletRequest req, final HttpServletResponse response) throws ServletException,
			IOException {

		final String image = req.getPathInfo();
		final String type = getFormat(image);
		final String mime = req.getSession().getServletContext().getMimeType(image);

		response.setContentType(mime);
		final File f = new File(IMAGE_PATH + image);
		if (f.exists()) {
			final OutputStream out = response.getOutputStream();
			try {
				final BufferedImage bi = ImageIO.read(f);
				ImageIO.write(bi, type, out);
			} catch (final IOException e) {
				LOGGER.log(Level.SEVERE, "Impossible de charger l'image : " + image);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		} else {
			LOGGER.log(Level.WARNING, "L'image : " + image + " n'existe pas");
		}
	}

	/**
	 * Renvoi l'extention d'une image
	 */
	public String getFormat(final String imageName) {
		final String img = imageName.toLowerCase();
		final String retour;
		if (img.endsWith(".png")) {
			retour = "PNG";
		} else if (img.endsWith(".gif")) {
			retour = "GIF";
		} else if (img.endsWith(".tiff")) {
			retour = "TIFF";
		} else if (img.endsWith(".jpg")) {
			retour = "JPG";
		} else if (img.endsWith(".jpeg")) {
			retour = "JPEG";
		} else {
			retour = "UNKNOWN";
		}
		return retour;
	}
}
