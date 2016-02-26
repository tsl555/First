using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

/// <summary>
/// Implements http-handler search.aspx
/// Recive request from client and redirect it to google rerver. Results return to client.
/// </summary>
public class Searcher : IHttpAsyncHandler
{
	public Searcher()
	{
	}

    #region Члены IHttpAsyncHandler

    delegate void googleSearcherDelegate(HttpContext Context);

    /// <summary>
    /// Start service user request.
    /// Create thread, that redirect request to google-server and return results to client
    /// </summary>
    /// <param name="Context">Connection context</param>
    /// <param name="cb">Callback function. Called when thread finish work</param>
    /// <param name="extraData">Not used</param>
    /// <returns>Asynch object for recive current thread state information</returns>
    IAsyncResult IHttpAsyncHandler.BeginProcessRequest(HttpContext Context, AsyncCallback cb, object extraData)
    {
        googleSearcherDelegate gsd = GoogleSearcher.RedirectRequestToGoogle;
        return gsd.BeginInvoke(Context, cb, gsd);
    }

    /// <summary>
    /// Stop main thread while service thread is working
    /// </summary>
    /// <param name="result">Asynch object for manage thread</param>
    void IHttpAsyncHandler.EndProcessRequest(IAsyncResult result)
    {
        googleSearcherDelegate gsd = (googleSearcherDelegate)result.AsyncState;
        gsd.EndInvoke(result);
    }

    #endregion

    #region Члены IHttpHandler

    /// <summary>
    /// This object can be reused
    /// </summary>
    bool IHttpHandler.IsReusable
    {
        get { return true; }
    }

    /// <summary>
    /// Not implemented for async handle
    /// </summary>
    /// <param name="context"></param>
    void IHttpHandler.ProcessRequest(HttpContext context)
    {
        throw new NotImplementedException();
    }

    #endregion
}
