<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{% block title %}{{ sitename }}{% endblock %}</title>
    <meta name="description" content="{% block description %}{{ description }}{% endblock %}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  	<meta name="bitly-verification" content="6503a2f39ad2"/>
  
    <link rel="stylesheet" href="/css/analog.css">

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
  </head>

  <body class="{{ collection }}">
    <header>
        <nav>
            <div class="logo">
              <!--
              {% if category_title %}
                <span class="category-title">{{ category_title }}</span>
              {% endif %}
              -->
              <a href='/'>
                <span class="title">{{ sitename }}</span>
                <span class="tagline">{{ tagline }}</span>            
              </a>
            </div>

            <ul class="nav-links">
              {% for link in navigation %}
                {% if link['name'] == collection %}
                <li><a href="{{ link['url'] }}" class="active">{{ link['name'] }}</a></li>
                {% else %}
                <li><a href="{{ link['url'] }}">{{ link['name'] }}</a></li>
                {% endif %}
              {% endfor %}
            </ul>
        </nav>
    </header>
    <main>
        <section id="main" class="section">
          {% block content %}{% endblock %}
        </section>
    </main>
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