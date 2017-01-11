package utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.logging.Level;

public class JsonUtil {
	public static final String LIVRE_PATH = "./AEFerrets/livres.json";
	public static final String NEWS_PATH = "./AEFerrets/news.json";
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
		try {
			final File data = new File(path);
			in = new BufferedReader(new FileReader(data));
			String line;
			while ((line = in.readLine()) != null) {
				json += line;
			}
		} catch (final Exception e) {
			LOGGER.log(Level.WARNING, "Erreur lors du chargement du serveur : " + e.getMessage());
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
}
