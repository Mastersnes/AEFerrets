package bdd;

import java.sql.SQLException;
import java.util.logging.Level;

import org.postgresql.ds.PGSimpleDataSource;

import utils.Logger;

public abstract class AbstractDao {
	final Logger log = new Logger(this.getClass().getName());
	protected PGSimpleDataSource datasource;

	protected PGSimpleDataSource getDatasource() throws SQLException {
		if (datasource == null) {
			datasource = new PGSimpleDataSource();
			datasource.setServerName(System.getenv("DB_HOST"));
			datasource.setDatabaseName(System.getenv("DB_NAME"));
			try {
				datasource.setPortNumber(Integer.parseInt(System.getenv("DB_PORT")));
			} catch (final Exception e) {
				log.log(Level.WARNING, e.getMessage());
			}
			datasource.setUser(System.getenv("DB_USER"));
			datasource.setPassword(System.getenv("DB_PASSWORD"));
			datasource.setSsl(false);
		}
		return datasource;
	}
}
