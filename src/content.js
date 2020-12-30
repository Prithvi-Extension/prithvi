function modify_query()
{
    var keyword_list = query.split('+');
    var new_keyword_list = [];
    var allKeys=["buy","price","cheap", "product", "shop", "sale","amazon","flipkart","myntra","purchase","ecological"];
    for(var i=0;i<keyword_list.length;i++)
    {
        if (!allKeys.includes(keyword_list[i])) {
            new_keyword_list.push(keyword_list[i]);
        }
    }
    good_query = new_keyword_list.join(' ');
    document.getElementById("inp").value = good_query;
}


//searchfunctions
function search_1()
{
    nop = 8;
    allPrices = [];
    allNames = [];
    allLinks = [];
    combined = 0;
    document.getElementById("web").innerHTML = "";
    query = document.getElementById("inp").value;
    url ='https://www.ecohoy.com/catalogsearch/result/?q=' + query;
    // keyword_list = query.split('+');
    // good_query = keyword_list.join(' ');
    modify_query();
    document.getElementById("text").innerHTML = "<h3>" + good_query + " alternatives on Ecohoy:" + "</h3><hr>";
    qnum=1;
    httpGet(url);   
}
function search_2()
{
    nop = 8;
    allPrices = [];
    allNames = [];
    allLinks = [];
    combined = 0;
    document.getElementById("web").innerHTML = "";
    // query = 'hello world';
    query = document.getElementById("inp").value;
    url = 'https://www.wudbox.in/?s=' + query + '&post_type=product';
    // keyword_list = query.split('+');
    // good_query = keyword_list.join(' ');
    modify_query();
    document.getElementById("text").innerHTML = "<h3>" + good_query + " alternatives on Wudbox:" + "</h3><hr>";
    qnum=2;
    httpGet(url);
    
}
function search_3()
{
    nop = 8;
    allPrices = [];
    allNames = [];
    allLinks = [];
    runnedsg = 0;
    combined = 0;
    document.getElementById("web").innerHTML = "";
    query = document.getElementById("inp").value;
    url ='http://www.saveglobe.in/shop/?s=' + query;
    // keyword_list = query.split('+');
    // good_query = keyword_list.join(' ');
    modify_query();
    document.getElementById("text").innerHTML = "<h3>" + good_query + " alternatives on SaveGlobe:" + "</h3><hr>";
    qnum=3;
    httpGet(url);
    
}
function search_4()
{
    nop = 8;
    allPrices = [];
    allNames = [];
    allLinks = [];
    runnedgm = 0;
    combined = 0;
    document.getElementById("web").innerHTML = "";
    query = document.getElementById("inp").value;
    url ='https://geosmin.in/?s=' + query;
    keyword_list = query.split('+');
    good_query = keyword_list.join(' ');
    document.getElementById("text").innerHTML = "<h3>" + good_query + " alternatives on Geosmin:" + "</h3><hr>";
    qnum=4;
    httpGet(url);
}

function search_all()
{
    nop = 3;
    allPrices = [];
    allNames = [];
    allLinks = [];
    runnedsg = 0;
    runnedgm = 0;
    combined = 1;
    combined_products_counter = 0;
    document.getElementById("web").innerHTML = "";
    query = document.getElementById("inp").value;
    url ='https://www.ecohoy.com/catalogsearch/result/?q=' + query;
    // keyword_list = query.split('+');
    // good_query = keyword_list.join(' ');
    modify_query();
    document.getElementById("text").innerHTML = "<h3>Eco-friendly alternatives for " + good_query + ":</h3><hr>";
    qnum=1;
    httpGet(url);
}
//----------------------------------------------------------------
//HttpGet Function

function httpGet(theUrl)
{
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, true );
    xmlHttp.send( null );

    if(qnum==1){
        xmlHttp.onreadystatechange = ProcessRequest_Ecohoy;
    }
    else if(qnum==2){
        xmlHttp.onreadystatechange = ProcessRequest_Wudbox; 
    }
    else if(qnum==3){
        xmlHttp.onreadystatechange = ProcessRequest_SG;
    }
    else if(qnum==4){
        xmlHttp.onreadystatechange = ProcessRequest_Geosmin;
    }

    // xmlHttp.abort();
}
//---------------------------------------------------------------
//Link Creator
function CreateLink(url)
{
    var a = document.createElement('a');                                
    // Create the text node for anchor element. 
    var link = document.createTextNode(url + "\n\n");                           
    // Append the text node to anchor element. 
    a.appendChild(link);                            
    // Set the title. 
    a.title = url;                                
    // Set the href property. 
    a.href = url;  
    a.target = "_blank";                          
    // Append the anchor element to the body. 
    // document.body.appendChild(a);
    document.getElementById("text").appendChild(a);                       
    // document.append("\n");
    document.getElementById("text").innerHTML += "<br><hr>";
}
//---------------------------------------------------------------
//ProcessRequests------------------------------------------------------

function ProcessRequest_Ecohoy()
{
    // document.getElementById("text").innerHTML += "here " + xmlHttp.readyState + " " + xmlHttp.status + "<br>";
    if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 )
    {           
        // document.getElementById("text").innerHTML += "inside now <br>";
        var container = document.createElement("p");
        container.innerHTML = xmlHttp.responseText;
        var anchors = container.getElementsByTagName("a");

        var spans = container.getElementsByClassName("price");
        for(var i = 0; i < spans.length; i++)
        {
            if(spans.item(i).getAttribute('id') == null)
                allPrices.push(spans.item(i));
            else if(spans.item(i).getAttribute('id').substring(0,13) == 'product-price')
                allPrices.push(spans.item(i));
        }
            
        var counter = 0;
        var product_counter = 0;
        var actual_product_counter = 0;
        for (var i = 0; i < anchors.length; i++) 
        {
            // document.getElementById("text").innerHTML += "there are anchors <br>";
            var href = anchors[i].href;
            var exists = 0;
            for(var j = 0; j < allLinks.length; j++)    // remove duplicates
                if(allLinks[j] == href)
                    exists = 1;
            if (exists == 0)
            {
                allLinks.push(href);
                // document.getElementById('printLinks').innerHTML += href + "<br />";
                if(href.substring(23, 50) == "catalogsearch/result/index/")
                {
                    counter++;  
                }
                else
                {
                    if(counter>0)
                    {
                        if(product_counter%2==0 && actual_product_counter<nop) {
                            // var item = document.createElement("item");
                            // item.innerHTML = href + "<br/>";
                            // item.href = href + "<br/>";
                            // document.write(href + "<br/>");    

                            // Create anchor element. 
                            actual_product_counter++;
                            if (combined==1) {combined_products_counter++;}
                            // document.write("<br>" + actual_product_counter + ".<br>");

                            // document.getElementById("text").innerHTML += actual_product_counter + "." + "<br/>";
                            if (combined==1) {
                                document.getElementById("text").innerHTML += combined_products_counter + "." + "<br/>";
                            }
                            else
                            {
                                document.getElementById("text").innerHTML += actual_product_counter + "." + "<br/>";
                            }
                            // var a = document.createElement('a');  
                                
                            // // Create the text node for anchor element. 
                            // var link = document.createTextNode(href + "\n\n"); 
                                
                            // // Append the text node to anchor element. 
                            // a.appendChild(link);  
                                
                            // // Set the title. 
                            // a.title = href; 
                                
                            // // Set the href property. 
                            // a.href = href;  

                            // a.target = "_blank";
                            // Append the anchor element to the body.
                            

                            var title = "<b>Name: </b>" + anchors[i].title + "<br>";
                            // document.write("<b>Name: </b>", title);
                            // document.write("<br>");
                            document.getElementById("text").innerHTML += title;

                            // document.write("<b>Price: </b>", allPrices[actual_product_counter-1].textContent);
                            // document.write("<br>");
                            var price = "<b>Price: </b>" + allPrices[actual_product_counter-1].textContent + "<br>";
                                // document.write(price);
                            document.getElementById("text").innerHTML += price;

                            // var stuff = anchors[i].getElementsByTagName("img");
                            // document.write(stuff[0].alt);

                            var imgObj = anchors[i].getElementsByTagName('img')[0];
                            var img = document.createElement('img');
                            img.src = imgObj.getAttribute('data-src');
                            img.height = 100;  
                            img.width = 100;
                            // document.body.appendChild(img);
                            document.getElementById("text").appendChild(img);
                        
                            // document.body.appendChild(a);  
                            // document.getElementById("text").appendChild(a);
                            // document.append("\n");
                            // document.write("<br><hr>");
                            CreateLink(href); 
                            // document.getElementById("text").innerHTML += "<br><hr>";
                            
                            //document.write(anchors[i].data-src);
                        }
                        product_counter++;

                    }
                }
            }
        }
        if (combined==1) {
            allPrices = [];
            allNames = [];
            query = document.getElementById("inp").value;
            url = 'https://www.wudbox.in/?s=' + query + '&post_type=product';
            // document.getElementById("text").innerHTML += "Products on WudBox:" + "<br>";
            qnum=2;
            httpGet(url);
        }
        else
        {
            end_search("Ecohoy", 'https://www.ecohoy.com/catalogsearch/result/?q=' + query);
        }
        
    }
    
}

function ProcessRequest_Wudbox()
{

    if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 )
    {

            var container = document.createElement("p");
            container.innerHTML = xmlHttp.responseText;
            var anchors = container.getElementsByTagName("a");
            var spans = container.getElementsByClassName("price");
            for(var i = 0; i < spans.length; i++)
            {
                allPrices.push(spans.item(i));
            }


            var names = container.getElementsByClassName("name");
            for(var i = 0; i < names.length; i++)
            {
                allNames.push(names.item(i));
            }
            

            var list = [];
            var counter = 0;
            var product_counter = 0;
            var actual_product_counter = 0;
            for (var i = 0; i < anchors.length; i++) 
            {
                var href = anchors[i].href;
                var exists = 0;
                // for(var j = 0; j < allLinks.length; j++)    // remove duplicates
                //     if(allLinks[j] == href)
                //         exists = 1;
                if (exists == 0)
                {
                    allLinks.push(href);
                    // document.getElementById('printLinks').innerHTML += href + "<br />";
                    if(href.substring(21, 30)=="/product/")
                    {

                        // document.write(href + "<br/>");    
                        if(actual_product_counter<nop)
                        {
                            var imgObjList = anchors[i].getElementsByTagName('img');
                            if(imgObjList.length!=0)
                            {
                                var imgObj = imgObjList[0];
                                actual_product_counter++;
                                if (combined==1) {combined_products_counter++;}
                                // document.write(actual_product_counter + "." + "<br/>");
                                // document.getElementById("text").innerHTML += actual_product_counter + "." + "<br/>";
                                if (combined==1) {
                                    document.getElementById("text").innerHTML += combined_products_counter + "." + "<br/>";
                                }
                                else
                                {
                                    document.getElementById("text").innerHTML += actual_product_counter + "." + "<br/>";
                                }
                                var name = "<b>Name: </b>" + allNames[actual_product_counter-1].textContent + "<br>";
                                // document.write(name);
                                document.getElementById("text").innerHTML += name;
                                var price = "<b>Price: </b>" + allPrices[actual_product_counter-1].textContent + "<br>";
                                // document.write(price);
                                document.getElementById("text").innerHTML += price;

                                var img = document.createElement('img');
                                img.src = imgObj.getAttribute('data-lazy-src');
                                img.height = 100;
                                img.width = 100;
                                // document.body.appendChild(img);
                                document.getElementById("text").appendChild(img);

                                // var a = document.createElement('a');  
                                  
                                // // Create the text node for anchor element. 
                                // var link = document.createTextNode(href + "\n\n"); 
                                  
                                // // Append the text node to anchor element. 
                                // a.appendChild(link);  
                                  
                                // // Set the title. 
                                // a.title = href;  
                                  
                                // // Set the href property. 
                                // a.href = href;  

                                // a.target = "_blank";
                                CreateLink(href);
                                  
                                // Append the anchor element to the body. 
                                // document.body.appendChild(a);  
                                // document.getElementById("text").appendChild(a);
                                // document.append("\n");
                                
                                // document.write("<br><hr>");
                                // document.getElementById("text").innerHTML += "<br><hr>";

                            }
                            
                        }
                    }
                    
                    
                }
            }
            if (combined==1) {
                allPrices = [];
                allNames = [];
                runnedsg = 0;
                combined_products_counter_sg = combined_products_counter;
                query = document.getElementById("inp").value;
                url ='http://www.saveglobe.in/shop/?s=' + query;
                // document.getElementById("text").innerHTML = "Products on SaveGlobe:" + "<br>";
                qnum=3;
                httpGet(url);
            }
            else
            {
                end_search("Wudbox", 'https://www.wudbox.in/?s=' + query + '&post_type=product');
            }

    }
}

function ProcessRequest_SG()
{
    if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 )
    {           
        var container = document.createElement("p");
        container.innerHTML = xmlHttp.responseText;
        var anchors = container.getElementsByTagName("a");
        var counter = 0;
        var product_counter = 0;
        var actual_product_counter = 0;
        for (var i = 0; i < anchors.length; i++) 
        {
            var href = anchors[i].href;
            var exists = 0;
            for(var j = 0; j < allLinks.length; j++)    // remove duplicates
                if(allLinks[j] == href)
                    exists = 1;
            if (exists == 0)
            {
                allLinks.push(href); 
                
                // document.getElementById('printLinks').innerHTML += href + "<br />";
                if(href.substring(0, 37) == "http://www.saveglobe.in/shop/product/")
                {
                    if(actual_product_counter<nop)
                    {
                        actual_product_counter++;
                        if (combined==1) {combined_products_counter++;}
                        var imgObj = anchors[i].getElementsByTagName('img')[0];
                        var img = document.createElement('img');
                        img.src = imgObj.getAttribute('src');
                        img.height = 100;
                        img.width = 100;
                        go_to_price_SG(href,img);
                        // document.getElementById("text").innerHTML += "<br><hr>";
                    }
                }

            }
        }

        if (combined==1) {
            // combined_products_counter += runnedsg;
            // document.getElementById("text").innerHTML += "Counter Val =" + combined_products_counter + "<br>";
            combined_products_counter_gm = combined_products_counter;
            allPrices = [];
            allNames = [];
            runnedgm = 0;
            query = document.getElementById("inp").value;
            url ='https://geosmin.in/?s=' + query;
            // document.getElementById("text").innerHTML = "Products on Geosmin:" + "<br>";
            qnum=4;
            httpGet(url);
        }
        else
        {
            end_search("Save Globe", 'http://www.saveglobe.in/shop/?s=' + query);
        }
    }
}

function ProcessRequest_Geosmin()
{

    if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 )
    {

        var container = document.createElement("p");
        container.innerHTML = xmlHttp.responseText;
        var anchors = container.getElementsByTagName("a");
        var list = [];
        var counter = 0;
        var product_counter = 0;
        var actual_product_counter = 0;
        for (var i = 0; i < anchors.length; i++) 
        {
            var href = anchors[i].href;
            var exists = 0;
            for(var j = 0; j < allLinks.length; j++)    // remove duplicates
                if(allLinks[j] == href)
                    exists = 1;
            if (exists == 0)
            {
                allLinks.push(href);
                if(href.substring(18,27)=="/product/")
                {
                    if(actual_product_counter<nop)
                    {
                        actual_product_counter++;
                        if (combined==1) {combined_products_counter++;}
                        var imgObj = anchors[i].getElementsByTagName('img')[0];
                        var img = document.createElement('img');
                        img.src = imgObj.getAttribute('src');
                        img.height = 100;  
                        img.width = 100;
                        go_to_price_GM(href,img);
                            
                    }
                }
            }        
        }
        if (combined!=1) {
            end_search("Geosmin", 'https://geosmin.in/?s=' + query);
        }
    }

}

//--------------------------------------------------------------------------------------
//prodwindowtypefunction
var runnedsg=0;
var runnedgm=0;
function go_to_price_SG(produrl,image)
{   
    var xmls=null;
    xmls = new XMLHttpRequest();
    xmls.open( "GET", produrl, true);
    xmls.send( null );
    
    xmls.onreadystatechange = function ()
    {
        if ( xmls.readyState == 4 && xmls.status == 200 )
        {  
            var container = document.createElement("p");
            container.innerHTML = xmls.responseText;
            var para = container.getElementsByClassName("product_price price headerfont");
            var name = container.getElementsByClassName("product_title entry-title");
            allPrices.push(para.item(0).textContent);
            allNames.push(name.item(0).textContent);
            // document.write("<br>" + (runnedsg+1) + "." );
            // document.write(allNames[(runnedsg)]+ "<br>");
            // document.writeln(allPrices[runnedsg]);
            // runnedsg++;
            // CreateLink(produrl);
            // document.body.appendChild(image);
            // document.write("<br><hr>");
            // document.getElementById("text").innerHTML += (runnedsg+1) + ".<br>";
            if (combined==1) {
                document.getElementById("text").innerHTML += (combined_products_counter_sg+runnedsg+1) + "." + "<br/>";
            }
            else
            {
                document.getElementById("text").innerHTML += (runnedsg+1) + "." + "<br/>";
            }
            var name = "<b>Name: </b>" + allNames[runnedsg] + "<br>";
            // document.write(name);
            document.getElementById("text").innerHTML += name;
            var price = "<b>Price: </b>" + allPrices[runnedsg] + "<br>";
            // document.write(price);
            document.getElementById("text").innerHTML += price;
            runnedsg++;
            document.getElementById("text").appendChild(image);
            CreateLink(produrl);
        }
    }  
}
function go_to_price_GM(produrl,image)
{   
    var xmls=null;
    xmls = new XMLHttpRequest();
    xmls.open( "GET", produrl, true);
    xmls.send( null );
    
    xmls.onreadystatechange = function ()
    {
        if ( xmls.readyState == 4 && xmls.status == 200 )
        {  
            var container = document.createElement("p");
            container.innerHTML = xmls.responseText;
            var para = container.getElementsByClassName("woocommerce-Price-amount amount");
            var name = container.getElementsByClassName("entry-title");
            allPrices.push(para.item(0).textContent);
            allNames.push(name.item(0).textContent);
            // document.write("<br>" + ((runnedgm/2)+1) + "." );
            // document.write(allNames[(runnedgm/2)]+ "<br>");
            // document.writeln("Actual price: "+allPrices[runnedgm]+"<br>");
            // runnedgm++;
            // allPrices.push(para.item(1).textContent);
            // document.writeln("Price with discount: "+allPrices[runnedgm]+"<br>");
            // runnedgm++;
            // CreateLink(produrl);
            // document.body.appendChild(image);
            // document.write("<br><hr>");
            // document.getElementById("text").innerHTML += (runnedgm+1) + ".<br>";
            if (combined==1) {
                document.getElementById("text").innerHTML += (combined_products_counter_gm+runnedgm+1) + "." + "<br/>";
            }
            else
            {
                document.getElementById("text").innerHTML += (runnedgm+1) + "." + "<br/>";
            }
            var name = "<b>Name: </b>" + allNames[runnedgm] + "<br>";
            // document.write(name);
            document.getElementById("text").innerHTML += name;
            var price = "<b>Price: </b>" + allPrices[runnedgm] + "<br>";
            // document.write(price);
            document.getElementById("text").innerHTML += price;
            runnedgm++;
            document.getElementById("text").appendChild(image);
            CreateLink(produrl);
        }
    }  
}

function end_search(title, href)
{
    
    // document.getElementById("text").innerHTML += "<h3>Open website to see all products:</h3>";
    var a = document.createElement('a');  
                                  
    // Create the text node for anchor element. 

    var link = document.createTextNode("Open website to see all products"); 
      
    // Append the text node to anchor element. 
    a.appendChild(link);  
      
    // Set the title. 
    a.title = title;  
      
    // Set the href property. 
    a.href = href;  

    a.target = "_blank";

    document.getElementById("web").appendChild(a);
    document.getElementById("web").innerHTML += "<br>";

}
//------------------------------------------------------------------
//maincode----------------------------------------------------------
//Event Listeners
document.getElementById("s1").addEventListener("click", search_1 );
document.getElementById("s2").addEventListener("click", search_2);
document.getElementById("s3").addEventListener("click", search_3);
document.getElementById("s4").addEventListener("click", search_4);
document.getElementById("sn").addEventListener("click", search_all);
document.getElementById("inp").addEventListener("change", search_all);
//Window and vars
window.resizeBy(1200,900);
var query;
var good_query;
var qnum;
var nop= 5;
var xmlHttp = null;
var allLinks = []; //set of all internal and external links
var allPrices = [];
var allNames =[];
var combined_products_counter = 0;
var combined_products_counter_sg = 0;
var combined_products_counter_gm = 0;

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    var start = url.indexOf("q=")+2;
    var end = url.indexOf("&", start);
    query = url.substring(start, end);
    document.getElementById("inp").value = query;
    search_all();
});
//---------------------------------------------------------------------




