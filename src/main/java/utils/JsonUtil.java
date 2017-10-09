package utils;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.logging.Level;

public class JsonUtil {
    public static final String CONNEXION_PATH = "./AEFerrets/connexions.json";
	public static final String LIVRE_PATH = "./AEFerrets/livres.json";
	public static final String LIVRE_FREE_PATH = "./AEFerrets/livresGratuit.json";
	public static final String NEWS_PATH = "./AEFerrets/news.json";
	public static final String SALONS_PATH = "./AEFerrets/salons.json";
	public static final String MOI_PATH = "./AEFerrets/biographie.json";
	public static final String MARQUES_PAGE_PATH = "./AEFerrets/marquesPage.json";
	private static Logger LOGGER = new Logger(JsonUtil.class.getName());

	/**
	 * Methode permettant de charger un fichier json
	 * 
	 * @param path
	 * @return
	 */
	public static synchronized String load(final String path) {
		String json = "";
		BufferedReader in = null;
		final File data = new File(path);
		try {
			in = new BufferedReader(new FileReader(data));
			String line;
			while ((line = in.readLine()) != null) {
				json += line;
			}
		} catch (final Exception e) {
			LOGGER.log(Level.WARNING, "Erreur lors du chargement du server : " + e.getMessage());
			if (data != null) {
				LOGGER.log(Level.WARNING, "Erreur lors du chargement du fichier : " + data.getAbsolutePath());
			}
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (final IOException e) {
					LOGGER.log(Level.WARNING, "Impossible de fermer le fichier de sauvegarde");
				}
			}
		}
		return json;
	}

    /**
     * Methode permettant de sauver un fichier json
     * 
     * @param path
     * @return
     */
    public static synchronized void save(final String path, final String json) {
        BufferedWriter out = null;
        final File data = new File(path);
        try {
            out = new BufferedWriter(new FileWriter(data));
            out.append(json);
            out.flush();
        } catch (final Exception e) {
            LOGGER.log(Level.WARNING, "Erreur lors du chargement du server : " + e.getMessage());
            if (data != null) {
                LOGGER.log(Level.WARNING, "Erreur lors du chargement du fichier : " + data.getAbsolutePath());
            }
        } finally {
            if (out != null) {
                try {
                    out.close();
                } catch (final IOException e) {
                    LOGGER.log(Level.WARNING, "Impossible de fermer le fichier de sauvegarde");
                }
            }
        }
    }
}
