//*
//* Functions for AJAX
//*

// create AJAX object
function createAJAX()
{
    var res = null;
    if (window.XMLHttpRequest)  // modern browser
        res = new XMLHttpRequest();   
    else if (window.ActiveXObject) // old browser
    {
        try
        {
            res = new ActiveXObject('Microsoft.XMLHTTP');
        }
        catch (e) {}
    }
    return res;
}

// Load data from url by ajax. When loading is finished called callback function
// callback signature: void f(data, rerurnStatus)
function startLoadingData(url, callbackFunction)
{
    var ajax = createAJAX();
    if (ajax)
    {
        try
        {
            ajax.open("GET", url, true);
            ajax.onreadystatechange = function() { onReadyStatyChange(ajax, callbackFunction); };
            ajax.send(null);
            return true;
        }
        catch(e){}
    }
    return false;
}

// called when ajax-object change state
// when state is 4 (completed) called callback-function onFinish
function onReadyStatyChange(ajax, onFinish)
{
    window.status = toHumanViewAJAXState(ajax.readyState);
    if (ajax.readyState == 4)
        onFinish(ajax.responseText, ajax.status);
}

// convert digital-state of ajax to readable string-state
function toHumanViewAJAXState(state)
{
    switch(state)
    {
        case 0:
            return "Initialization";
        case 1:
            return "Connected to server";
        case 2:
            return "Data responsed to server";
        case 3:
            return "Data recived from server";
        case 4:
            return "Ready";
        default:
            return "Unknown ajax state";
    }
}
