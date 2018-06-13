package bdd;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.postgresql.ds.PGSimpleDataSource;

import bean.Action;
import bean.User;

public class UserActionDao extends AbstractDao {
    private static UserActionDao instance;
    private static SimpleDateFormat sf = new SimpleDateFormat("dd/MM/yyyy");

    private UserActionDao() {
        Connection connection = null;
        try {
            final PGSimpleDataSource datasource = getDatasource();
            connection = datasource.getConnection();
            final Statement statement = connection.createStatement();

            statement
.executeUpdate("CREATE TABLE IF NOT EXISTS " + "USER_ACTION(" + "IP TEXT, " + "ACTION TEXT, "
                    + "ACTION_DATE TEXT," + "PRIMARY KEY(IP, ACTION, ACTION_DATE)" + ")");
        } catch (final SQLException e) {
            System.out.println("Impossible de creer la table USER_ACTION");
            e.printStackTrace();
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (final SQLException e) {
                    System.out.println("Impossible de fermer la connexion");
                }
            }
        }
    }

    /**
     * Singleton
     * 
     * @return
     */
    public static synchronized UserActionDao getInstance() {
        if (instance == null) {
            instance = new UserActionDao();
        }
        return instance;
    }

    public void addNew(final String ip, final String action) {
        Connection connection = null;
        try {
            final PGSimpleDataSource datasource = getDatasource();
            connection = datasource.getConnection();
            final Statement statement = connection.createStatement();

            String sql = "INSERT INTO USER_ACTION VALUES(':ip', ':actionName', ':actionDate')";
            sql = sql.replaceAll(":ip", ip);
            sql = sql.replaceAll(":actionName", action);
            sql = sql.replaceAll(":actionDate", sf.format(new Date()));
            statement.executeUpdate(sql);
        } catch (final SQLException e) {
            System.out.println("Impossible d'inserer une nouvelle action utilisateur");
            e.printStackTrace();
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (final SQLException e) {
                    System.out.println("Impossible de fermer la connexion");
                }
            }
        }
	}

    public Map<String, User> getConnexions() {
        final Map<String, User> mapActionsUser = new HashMap<>();

        Connection connection = null;
        try {
            final PGSimpleDataSource datasource = getDatasource();
            connection = datasource.getConnection();
            final Statement statement = connection.createStatement();

            final ResultSet rs = statement.executeQuery("SELECT * FROM USER_ACTION");
            while (rs.next()) {
                final String ip = rs.getString("IP");
                final String action = rs.getString("ACTION");
                final String actionDate = rs.getString("ACTION_DATE");

                User userFind = mapActionsUser.get(ip);
                if (userFind == null) {
                    userFind = new User();
                    userFind.setIp(ip);
                    mapActionsUser.put(ip, userFind);
                }
                Action actionFind = userFind.getActions().get(action);
                if (actionFind == null) {
                    actionFind = new Action();
                    actionFind.setName(action);
                    actionFind.setNombre(1);
                    actionFind.setDate(actionDate);
                    userFind.getActions().put(action, actionFind);
                } else {
                    actionFind.setNombre(actionFind.getNombre() + 1);
                }
            }
        } catch (final SQLException e) {
            System.out.println("Impossible de recuperer les actions");
            e.printStackTrace();
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (final SQLException e) {
                    System.out.println("Impossible de fermer la connexion");
                }
            }
        }

        return mapActionsUser;
    }
}
