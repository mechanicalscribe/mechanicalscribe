<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{% block title %}Mechanical Scribe{% endblock %}</title>
    <meta name="description" content="{% block description %}The personal site for Chris Wilson, director of data journalism at Time.com{% endblock %}">
    <meta name="viewport" content="width=device-width, initial-scale=1">

  	<meta name="bitly-verification" content="6503a2f39ad2"/>
  
    <link rel="stylesheet" href="/js/vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/scribe.css">

    {% for style in css %}         
    <link rel="stylesheet" href="{{ style }}">
    {% endfor %}

    {% if prettify %}
    <link rel="stylesheet" href="/css/prettify.css">
    {% endif %}


    {% if inlinecss %}
    <style>
      {{ inlinecss }}
    </style>
    {% endif %}

    {{ extrahead }}
    <script src="/js/vendor/modernizr/modernizr.min.js"></script>
  </head>
  <body>
    <header>
      <div class="banner">  
        <a href="http://www.mechanicalscribe.com/">
          <img src="/img/site/scribe-banner-800.png" />
        </a>
        <div class="navbar">
          <div class="kicker">Infrequent posts by Chris Wilson. This site does not use cookies.</div>
          <ul class="nav nav-pills">
            <li><a class="menu" href="/">Home</a></li>
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="/notes">
                Notes <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                {% for post in collections.notes %}
                <li>                  
                  <a href="/{{ post.path }}">{{ post.title }}<span class="pipe">|</span><span class="date">{{ post.date | date('F j, Y') }}</span></a>
                </li>
                {% endfor %}
                <li class="divider"></li>
                <li>                  
                  <a href="/notes/index.html">All notes</a>
                </li>
              </ul>
            </li>
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="/music">
                Music <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
              {% for post in collections.music %}
                <li>
                  <a href="/{{ post.path }}">{{ post.title }}</a>
                </li>
              {% endfor %}
                <li class="divider"></li>
                <li>                  
                  <a href="/music/index.html">All music</a>
                </li>
              </ul>
            </li>
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                Code <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>                  
                  <a href="https://github.com/wilson428">@wilson428</a>
                  <a href="https://github.com/TimeMagazine">@TimeMagazine</a>
                  <a href="https://github.com/mechanicalscribe">@mechanicalscribe</a>
                  <a href="https://github.com/unitedstates">@unitedstates</a>
                </li>
              </ul>
            </li>
            <li><a href="/about.html">About</a></li>
          </ul>
        </div>
      </div>                            
    </header>                 
    {% block content %}{% endblock %}
    <footer>&nbsp;</footer>


    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/js/vendor/jquery/jquery.min.js"><\/script>')</script>
    <script src="/js/vendor/bootstrap/js/bootstrap.min.js"></script>
    {% for script in js %}         
    <script src="{{ script }}"></script>
    {% endfor %}
    <script>
// make active item on menu correspond to page
$(".nav li a").bind("click", function() {
  $(".nav li").removeClass("active");
  $(this).parent().addClass("active");
});        

var page = document.URL.match(/\/([a-z]+)(\/[A-z0-9-]*)/);
var pages = [];
$(".navbar > ul > li > a").each(function(i, v) {
    pages.push($(v).attr("href")); 
});

if (page && page.length > 1 && pages.indexOf("/" + page[1]) != -1) {
  $(".navbar li").removeClass("active");
  $(".navbar li a[href='/" + page[1] + "']").parent().addClass("active");
}   
        
// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-40535547-1', 'mechanicalscribe.com');
ga('send', 'pageview');       
    </script>
    {% if prettify %}
    <script src="/js/vendor/prettify/prettify.js"></script>
    <script>
$("code").addClass("prettyprint");
prettyPrint();
    </script>
    {% endif %}   

    {% if extrajs %}
    <script>
    {{ extrajs | safe }}
    </script>
    {% endif %}
  </body>
</html>