package bdd;

import java.sql.SQLException;

import org.postgresql.ds.PGSimpleDataSource;

public abstract class AbstractDao {
    protected PGSimpleDataSource datasource;

    protected PGSimpleDataSource getDatasource() throws SQLException {
        if (datasource == null) {
            datasource = new PGSimpleDataSource();
            datasource.setServerName(System.getenv("DB_HOST"));
            datasource.setDatabaseName(System.getenv("DB_NAME"));
            datasource.setPortNumber(Integer.parseInt(System.getenv("DB_PORT")));
            datasource.setUser(System.getenv("DB_USER"));
            datasource.setPassword(System.getenv("DB_PASSWORD"));
            datasource.setSsl(false);
        }
        return datasource;
    }
}
