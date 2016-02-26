<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>MyGoogle</title>
    <script src="scripts/toolhelp.js" language=javascript></script>
    <script src="scripts/ajax.js" language=javascript></script>
    <script src="scripts/searcher.js" language=javascript></script>
</head>
<body>
    <form id="searchForm" runat="server">
    <div align=center>
        <img src="images/logo.gif" /><br />
        <asp:TextBox ID="keyword" runat="server" Width="400px"></asp:TextBox>
            <br />
            <asp:RequiredFieldValidator
                ID="KeywordValidator" runat="server" 
            ErrorMessage="Keyword is empty. Please write anything." 
            ControlToValidate="keyword"></asp:RequiredFieldValidator>
            <br />
        <asp:Button ID="searchBtn" runat="server" Text="Search" />
    </div>
    </form>
    <div id="searchResults" ></div>
    
</body>
</html>
