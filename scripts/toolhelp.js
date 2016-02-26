//*
//* File contains toolhelp functions
//*

// remove spaces at begin and end of string
function trim(str)
{
    if (str == null) return "";
    (new String).charAt()
    for (p1 = 0; p1 < str.length; p1++) // get position of first not space symbol
        if (str.charAt(p1) != ' ')
            break;
    for (p2 = str.length-1; p2 >= 0; p2--) // get position of last not space symbol
        if (str.charAt(p2) != ' ')
            break;
    return (p2 < p1) ? "" : str.substr(p1, p2-p1+1);
}

function isStringEmpty(str)
{
    return trim(str) == "";
}

// set brouser location
function goToURL(url)
{
    document.location.href = url;
}

function getCurrentPageAddress()
{
    return document.location.pathname;
}

//
//* Anchor contains from keyword and number of start page
//* It added to url after symbol #
//* Format is 'search=keyword&start=startPage'
//* keyword is encoded in anchor
//

function buildAnchor(keyword, startPage)
{
    return 'search=' + encodeURI(keyword) + '&start=' + startPage;
}

// get anchor form url-string
function getAnchor(url)
{
    var pos = url.indexOf('#');
    return (pos > -1) ? url.substr(pos+1, url.length-pos-1) : "";
}

// parse anchor. Gets keyword and start page
// default result: keyword: "", startPage: 0
function parseAnchor(anchor)
{
    var res = {keyword:"", startPage:0};
    var m = anchor.match(/search=(.*)&start=(.*)/);
    if (m)
    {
        res.keyword = decodeURI(m[1]);
        res.startPage = m[2];
    }
    return res;
}
