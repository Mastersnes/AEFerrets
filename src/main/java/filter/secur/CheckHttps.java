package filter.secur;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CheckHttps implements Filter {
	private FilterConfig conf;

	@Override
	public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain)
			throws IOException, ServletException {
		final HttpServletRequest req = (HttpServletRequest) request;
		final HttpServletResponse resp = (HttpServletResponse) response;
		if (!req.getServerName().equals("localhost") && req.getScheme().equals("http")) {
			String url = "https://" + req.getServerName() + req.getContextPath() + req.getServletPath();
			if (req.getPathInfo() != null) {
				url += req.getPathInfo();
			}
			resp.sendRedirect(url);
		} else {
			chain.doFilter(request, response);
		}
	}

	public FilterConfig getFilterConfig() {
		return conf;
	}

	public void setFilterConfig(final FilterConfig filterConfig) {
		conf = filterConfig;
	}

	@Override
	public void destroy() {
	}

	@Override
	public void init(final FilterConfig filterConfig) {
		conf = filterConfig;
	}
}
