package utils;

import java.text.SimpleDateFormat;

import com.google.gson.Gson;

public class Constantes {
    public static final SimpleDateFormat FORMAT = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    public static final SimpleDateFormat MONTH = new SimpleDateFormat("MM/yyyy");
    public static final DateComparator DATE_COMPARATOR = new DateComparator();
    public static final Gson GSON = new Gson();
    public static final String USER = "USER";
}
