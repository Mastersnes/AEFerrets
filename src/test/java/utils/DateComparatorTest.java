package utils;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.text.ParseException;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.junit.Test;

/**
 * Test pour DateComparator
 * 
 * @author snesztler
 *
 */
public class DateComparatorTest {

    @Test
    public void testCompare() {
        final List<String> listDate = Arrays.asList(new String[] { "01/2016", "03/2015", "05/2016", "02/2016",
                "05/2015", "03/2017", "01/2017", "02/2018", "01/2014" });
        Collections.sort(listDate, Constantes.DATE_COMPARATOR);

        for (final String s : listDate) {
            System.out.println(s);
        }

        for (int i=1; i<listDate.size(); i++) {
            try {
                final Date current = Constantes.MONTH.parse(listDate.get(i-1));
                final Date next = Constantes.MONTH.parse(listDate.get(i));
                assertTrue(current.after(next));
            } catch (final ParseException e) {
                fail("Impossible de parser la date");
            }
            
        }
    }

}
