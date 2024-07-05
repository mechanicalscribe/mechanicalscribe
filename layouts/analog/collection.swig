{% extends 'index.swig' %}

{% block content %}

<article class="main">
    <h1>{{ collection.category_title }}</h1>
    <div class="collection_posts">
    {% for post in collection %}
        <h2><a href="/{{ post.path }}">{{ post.title }}</a></h2>
        <div class="boilerplate">
            <span class="date">{{ post.date|date('F j, Y') }}</span>
            {% if post.github %}
            <span class="pipe">|</span><a class="github" href="{{ post.github }}" target="_blank">Source Code</a></span>
            {% endif %}
        </div>
        <div class="excerpt">{{ post.excerpt|safe }}</div>
    {% endfor %}
    </div>
</article>

{% endblock %}