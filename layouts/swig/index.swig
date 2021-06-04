<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{% block title %}Mechanical Scribe{% endblock %}</title>
    <meta name="description" content="{% block description %}The personal site for Chris Wilson, director of data journalism at TIME{% endblock %}">
    <meta name="viewport" content="width=device-width, initial-scale=1">

  	<meta name="bitly-verification" content="6503a2f39ad2"/>
  
    <link rel="stylesheet" href="/js/vendor/bootstrap-4.6.0/dist/css/bootstrap.min.css">
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

    {% if extrahead_scripts %}
      {% for extrahead_script in extrahead_scripts %}
        <script src="{{ extrahead_script }}"></script>
      {% endfor %}
    {% endif %}

    <!--<script src="/js/vendor/modernizr/modernizr.min.js"></script>-->

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-JSLT21CBJ3"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JSLT21CBJ3');
    </script>
  </head>
  <body>
    <header>
      <div class="banner">  
        <a class="banner-image" href="http://www.mechanicalscribe.com/">
          <img src="/img/site/scribe-banner-800.png" />
        </a>
        <div class="kicker">Infrequent posts by Chris Wilson. This site does not use cookies.</div>
        <nav class="navbar">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link show" href="/">Home</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="/notes" role="button" aria-haspopup="true" aria-expanded="false">Posts</a>
              <div class="dropdown-menu">
                {% for collection_key in collections_order %}                
                
                  <div class="dropdown-subheader">
                    RECENT <span class='category-head'>{{ collections[collection_key].category_title }}</span>
                    <span class="view-all"><a class="dropdown-landing-page" href="/{{ collection_key }}/index.html">View All</a></span>
                  </div>
                  {% for post in collections[collection_key].top5 %}
                  <a class="dropdown-item" href="/{{ post.path }}">{{ post.menu | safe }}<span class="date_span"><span class="pipe">|</span><date>{{ post.date | date('F j, Y') }}</date></span></a>
                  {% endfor %}
                  
                  <div class="dropdown-divider"></div>
                {% endfor %}
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Code</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" target='_blank' href="https://github.com/wilson428">@wilson428</a>
                <a class="dropdown-item" target='_blank' href="https://github.com/TimeMagazine">@TimeMagazine</a>
                <a class="dropdown-item" target='_blank' href="https://github.com/mechanicalscribe">@mechanicalscribe</a>
                <a class="dropdown-item" target='_blank' href="https://github.com/unitedstates">@unitedstates</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about.html">About</a>
            </li>
          </ul>
        </nav>
      </div>                            
    </header>               
    {% block content %}{% endblock %}
    <footer>
      <div id="referring_note"></div>
    </footer>

    <script>
// note referral

if (window.location.hash == "#redirect") {
  let redirectNote = document.getElementById("referring_note");
  redirectNote.innerHTML = `<strong>Note:</strong> Some of the URLs on Mechanical Scribe have changed. You were redirected to this page from <code>${ document.referrer }</code> because we guessed it's what you were looking for.`
}
    </script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/js/vendor/jquery-3.5.1/jquery.min.js"><\/script>')</script>
    <script src="/js/vendor/bootstrap-4.6.0/dist/js/bootstrap.bundle.min.js"></script>
    {% for script in js %}
    <script src="{{ script }}"></script>
    {% endfor %}

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