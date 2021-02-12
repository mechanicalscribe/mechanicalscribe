{% extends 'index.swig' %}

{% block content %}

<article class="main">
    <div class="posts">
    {% for post in collections.notes %}
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