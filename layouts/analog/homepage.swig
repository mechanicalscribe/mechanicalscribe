{% extends 'index.swig' %}

{% block content %}

<article class="main">

    <div class="chapter">
        <h1>What I Do</h1>
        <div class="description">{{ chapters["What I Do"] | safe  }}</div>
    </div>

    <div class="chapter">
        <h1>About Me</h1>
        <div class="description">{{ chapters["About Me"] | safe  }}</div>
    </div>


    <div class="chapter">
        <h1>What I Know</h1>
        <div class="description">{{ chapters["What I Know"] | safe  }}</div>
    </div>


    <div class="posts">
    {% for post in collections.notes %}
        <!--<div class="category-thumb"><a href="{{ post.collection_key }}/index.html">{{ post.category_type }}</a></div>-->
        <h2><a href="{{ post.path }}">{{ post.title}}</a></h2>
        <div class="boilerplate">
            <date class="date">{{ post.date|date('F j, Y') }}</date>
            {% if post.github %}
            <span class="pipe">|</span><a class="github" href="{{ post.github }}" target="_blank">Source Code</a></span>
            {% endif %}
        </div>
        <div class="excerpt">{{ post.excerpt|safe }}</div>
    {% endfor %}
    </div>

</article>

{% endblock %}