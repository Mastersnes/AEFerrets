package servlet.news;

import java.util.ArrayList;
import java.util.List;

import servlet.abstrait.GeneralResponse;
import bean.News;

/**
 * Reponse du controller NewsServlet
 * 
 * @author Snes
 * 
 */
public class NewsServletResponse extends GeneralResponse {
	private final List<News> news = new ArrayList<>();
	private final List<String> date = new ArrayList<>();
	private String preview = null;
	private String next = null;

	/**
	 * @return the news
	 */
	public final List<News> getNews() {
		return news;
	}

	/**
	 * @return the date
	 */
	public final List<String> getDate() {
		return date;
	}

	/**
	 * @return the preview
	 */
	public final String getPreview() {
		return preview;
	}

	/**
	 * @param preview
	 *            the preview to set
	 */
	public final void setPreview(final String preview) {
		this.preview = preview;
	}

	/**
	 * @return the next
	 */
	public final String getNext() {
		return next;
	}

	/**
	 * @param next
	 *            the next to set
	 */
	public final void setNext(final String next) {
		this.next = next;
	}

}
