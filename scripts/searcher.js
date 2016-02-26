var displayedURL = getCurrentPageAddress(); // url of current displaed data

// function called evere 800 milisec
// check current location with displayedURL. If not equal updata page
function checkLocation()
{
    if (isLocationChanged())
    {
        displayedURL = document.location.toString();
        var anchor = getAnchor(displayedURL);
        var p = parseAnchor(anchor);
        if (p.keyword != "")
            search(p.keyword, p.startPage, searchResults);
    }
}

// check is current location equal displayed data
function isLocationChanged()
{
    return (document.location.toString() != displayedURL);
}

setInterval("checkLocation()", 800);

// on click event for button
// starts searching by keyword.
// results will be printed in resultContainer
function onSearchClick(keyword, startPage, resultContainer)
{
    var trimedKeyword = trim(keyword).toLowerCase();
    if (trimedKeyword != "") // ignore empty strings
    {
        // update current location
        goToURL(getCurrentPageAddress() + '#' + buildAnchor(trimedKeyword, startPage));
        displayedURL = document.location.toString();
        // searching with ajax
        search(trimedKeyword, startPage, resultContainer);
    }
}

// on click event for link at down of page
// redirect call to onSearchClick
function onPageClick(anchor)
{
    var p = parseAnchor(anchor);
    onSearchClick(p.keyword, p.startPage, searchResults);
}

// Start searching with ajax by keyword
// Results will be printed at resultContainer
function search(keyword, startPage, resultContainer)
{
    // show loading-image
    resultContainer.innerHTML = '<img src="images/loader.gif" alt="Поиск" /> Searching.....';
    var anchor = buildAnchor(keyword, startPage);
    var url = "search.aspx?" + anchor;
    if (!startLoadingData(url, function(data, status){onReciveData(data, status, resultContainer, keyword);}))
        resultContainer.innerHTML = convertErrorToHTML('AJAX-error. Searching not possible.');
}

// when data is recived call this function
// data - search results
// status - return status. If everything is ok - 200. Server internal error - 500 and so on....
// container - div-element whitch contents results
// keyword - word or expression what we search
function onReciveData(data, status, container, keyword)
{
    var formatOK = false; // returned data has goood format?
    var htmlText = ''; // this text will be printed at container
    if (status == 200)
    {
        try
        {
            data = eval("(" + data + ")");
            formatOK = true;
        }
        catch(e)
        {
            // on data format error
            htmlText = convertErrorToHTML('Server data format error<br /><br />responseText: ' + data);
        }
    }
    else
        htmlText = convertErrorToHTML('Server internal error. Return status is ' + status);
    if (formatOK)
    {
        data.keyword = keyword; // add keyword to data struct
        if (data.serverError) // on server error
            htmlText = convertErrorToHTML('Message from http handler: ' + data.serverError);
        else if (data.responseStatus != 200) // on result error
            htmlText = convertErrorToHTML('Message from google-server: ' + data.responseDetails);
        else
            htmlText = convertDataToHTML(data);
    }
    container.innerHTML = htmlText;
}

// convert data from JSON-format to html
function convertDataToHTML(data)
{
    var responseData = data.responseData;
    if (responseData)
    {
        var results = responseData.results;
        if (results && results.length != 0)
        {
            var cursor = responseData.cursor;
            var html = '';
            try {html += estimatedToHTML(cursor.estimatedResultCount, data.keyword);} catch(e){}
            try {html += resultsToHTML(results);} catch(e){}
            try {html += pagesToHTML(cursor.pages, cursor.currentPageIndex+1, data.keyword);} catch(e){}
            return html;
        }
        else
            return 'Your keyword - ' + data.keyword + ' - did not match any documents';;
    }
}

// general result count
function estimatedToHTML(count, keyword)
{
    return '<p>Your keyword - ' + keyword + ' - match about ' + count + ' documents</p>';
}

// search-results
function resultsToHTML(results)
{
    var str = '<table width="630" border=0><tr><td width="50"></td><td>';
    for (i = 0; i < results.length; i++)
    {
        var record = results[i];
        str += '<p><a href="'+record.unescapedUrl+'" style="font-size:large">'+record.titleNoFormatting+'</a><br />'+record.content+'<br /><a href="http://'+record.visibleUrl+'" style="color:Green;font-size:small">'+record.visibleUrl+'</a> <a href="'+record.cacheUrl+'" style="color:Gray;font-size:small">Сохраненная копия</a><br /></p>';
    }
    return str + '</td></tr></table>';
}

// pages for more informations
function pagesToHTML(pages, currentPage, keyword)
{
    var str = '<table border="0"><tr>';
    for (i = 0; i < pages.length; i++)
    {
        var pageInfo = pages[i];
        if (pageInfo.label != currentPage)
            str += '<td width="15" align=center><a href="javascript:" onclick="onPageClick(\'' + buildAnchor(keyword, pageInfo.start) + '\')">'+pageInfo.label+'</a></td>';
        else
            str += '<td width="15" align=center style="background-color:#FFFF66">' + pageInfo.label + '</td>';
    }
    return str + '</tr></table>';    
}

// return html format for error
function convertErrorToHTML(errorText)
{
    return '<span style="font-size:large">Query runtime error:</span><br />' + errorText;
}
