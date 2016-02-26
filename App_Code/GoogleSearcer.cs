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
using System.Threading;
using System.Net;
using System.IO;

/// <summary>
/// Toolhelp class
/// Recive data from google server
/// </summary>
internal class GoogleSearcher
{
    /// <summary>
    /// Make search-request to google-server by keyword
    /// </summary>
    /// <param name="Keyword">Word or expression for search</param>
    /// <param name="StartPage">Start page in results</param>
    /// <returns>JSON-string with results of request</returns>
    public static string MakeRequestToGoogle(string Keyword, string StartPage)
    {
        // create request
        string url = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=" + Keyword;
        if (!string.IsNullOrEmpty(StartPage))
            url += "&start=" + StartPage;
        WebRequest req = HttpWebRequest.Create(url);
        WebResponse resp = req.GetResponse();
        // send request
        StreamReader sr = new StreamReader(resp.GetResponseStream());
        // recive answer
        string result = sr.ReadToEnd();
        sr.Close();
        return result;
    }

    /// <summary>
    /// Redirect request from client to google
    /// Imitate search process
    /// </summary>
    /// <param name="Context">Connection context</param>
    public static void RedirectRequestToGoogle(HttpContext Context)
    {
        // search params
        string keyword = Context.Request.QueryString["search"];
        string startPage = Context.Request.QueryString["start"];
        string data;
        try
        {
            data = MakeRequestToGoogle(keyword, startPage); // recive results from google
            Context.Response.ContentType = "application/x-javascript"; // client will cache results
        }
        catch (Exception e)
        {
            data = "{\"serverError\":\"" + e.Message + "\"}";
        }
        Context.Response.Write(data); // send results to client
    }
}
