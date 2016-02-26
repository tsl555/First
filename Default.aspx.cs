using System;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

public partial class _Default : System.Web.UI.Page 
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // on submit form will be called javascript function onSearchClick
        // submit canceled
        this.searchForm.Attributes.Add("onsubmit", "onSearchClick(searchForm.keyword.value, 0, searchResults);return false;");
    }
}
