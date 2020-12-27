document.getElementById("s1").addEventListener("click", search_1);
document.getElementById("s2").addEventListener("click", search_2);
document.getElementById("s3").addEventListener("click", search_3);
document.getElementById("sn").addEventListener("click", search_n);

window.resizeBy(600,800);
var query;

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    var start = url.indexOf("q=")+2;
    var end = url.indexOf("&", start);
    query = url.substring(start, end);
    document.getElementById("inp").value = query;
    
// use `url` here inside the callback because it's asynchronous!
});

// document.write(document);

var xmlHttp = null;
var allLinks = []; //set of all internal and external links
function httpGet(theUrl)
{
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, true );
    xmlHttp.send( null );
    xmlHttp.onreadystatechange = ProcessRequest;
}

function ProcessRequest()
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
                    // document.getElementById('printLinks').innerHTML += href + "<br />";
                    if(href.substring(23, 50) == "catalogsearch/result/index/")
                    {
                        counter++;  
                    }
                    else
                    {
                        if(counter>0)
                        {
                            if(product_counter%2==0 && actual_product_counter<5) {
                                // var item = document.createElement("item");
                                // item.innerHTML = href + "<br/>";
                                // item.href = href + "<br/>";
                                // document.write(href + "<br/>");    

                                // Create anchor element. 
                                actual_product_counter++;
                                document.write("<br>" + actual_product_counter + ".");
                                var a = document.createElement('a');  
                                  
                                // Create the text node for anchor element. 
                                var link = document.createTextNode(href + "\n\n"); 
                                  
                                // Append the text node to anchor element. 
                                a.appendChild(link);  
                                  
                                // Set the title. 
                                a.title = href;  
                                  
                                // Set the href property. 
                                a.href = href;  

                                a.target = "_blank";
                                  
                                // Append the anchor element to the body. 
                                document.body.appendChild(a);  
                                // document.append("\n");
                                document.write("<br>");

                            }
                            product_counter++;

                        }
                    }
                }
             }
        }
}

function myFunction() {
  // document.getElementById("demo").innerHTML = "Hello World";
  window.open('https://www.geeksforgeeks.org/building-basic-chrome-extension/');
  // alert("hello world!");
  // document.write("Hello");
}

function search_1()
{
    // query = 'hello world';
    query = document.getElementById("inp").value;
    url ='https://www.ecohoy.com/catalogsearch/result/?q=' + query;
    // window.open(url,'_blank');
    document.write("Similar Products :" + "<br>");
    httpGet(url);

    // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    // let url = tabs[0].url;
    // // sv = getSearchValue(url);
    // document.write(url);

    // use `url` here inside the callback because it's asynchronous!
	// });
	
}


function search_2()
{
    // query = 'hello world';
    query = document.getElementById("inp").value;
    url ='https://www.amazon.in/s?k=' + query;
    window.open(url,'_blank');
}

function search_3()
{
    // query = 'hello world';
    query = document.getElementById("inp").value;
    url ='https://www.flipkart.com/search?q=' + query;
    window.open(url,'_blank');
}

function search_n()
{
    query = document.getElementById("inp").value;
    url ='https://www.ecohoy.com/catalogsearch/result/?q=' + query;
    window.open(url,'_blank');
    query = document.getElementById("inp").value;
    url ='https://www.amazon.in/s?k=' + query;
    window.open(url,'_blank');
}





// document.getElementById("myBtn").addEventListener("click", function() {
//   window.open('https://www.geeksforgeeks.org/building-basic-chrome-extension/');
// });

// function func() { 
//     window.open('https://www.geeksforgeeks.org/building-basic-chrome-extension/');
// } 

// sha256-Z4jIeXlk339BwT6Pio+ztpyXQgFioDKSoDoyCf3MBnk=


