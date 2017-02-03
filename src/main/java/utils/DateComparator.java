package utils;

import java.util.Comparator;

/**
 * Comparateur des dates, renvoi les dates de la plus recente à la plus ancienne :
 * 02/2017
 * 01/2017
 * 12/2017
 * 11/2017
 * 10/2017
 * 
 * @author snesztler
 *
 */
public class DateComparator implements Comparator<String> {

    @Override
    public int compare(final String date1, final String date2) {
        final int mois1 = Integer.parseInt(date1.substring(0, 2));
        final int annee1 = Integer.parseInt(date1.substring(3));
        final int mois2 = Integer.parseInt(date2.substring(0, 2));
        final int annee2 = Integer.parseInt(date2.substring(3));
        if (annee1 != annee2) {
            return annee2 - annee1;
        } else {
            return mois2 - mois1;
        }
    }

}
