package utils;

import java.text.SimpleDateFormat;

import com.google.gson.Gson;

public class Constantes {
	public final static SimpleDateFormat FORMAT = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	public final static SimpleDateFormat MONTH = new SimpleDateFormat("MM/yyyy");
	public final static Gson GSON = new Gson();
	public final static String USER = "USER";
}
