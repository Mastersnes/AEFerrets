package bdd;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import org.junit.Test;

import utils.Constantes;

/**
 * Test pour NewsDAO
 * 
 * @author snesztler
 *
 */
public class NewsDAOTest {

    @Test
    public void testListDateNotEmpty() {
        final List<String> listDate = NewsDAO.getInstance().listDate();
        assertFalse(listDate.isEmpty());
    }

    @Test
    public void testListDateOrder() {
        final List<String> listDate = NewsDAO.getInstance().listDate();
        assertFalse("La liste de date est vide, impossible de faire le test", listDate.isEmpty());

        Date d1;
        Date d2;
        try {
            d1 = Constantes.MONTH.parse(listDate.get(0));
            d2 = Constantes.MONTH.parse(listDate.get(1));
            assertTrue(d1.after(d2));
        } catch (final ParseException e) {
            fail("Impossible de formatter les dates");
        }
    }

}
