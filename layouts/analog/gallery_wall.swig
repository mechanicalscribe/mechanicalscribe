{% extends 'index.swig' %}

{% block title %}{% parent %} | {{ title }} {% endblock %}

{% block description %}{{ excerpt|striptags }}{% endblock %}

{% block content %}

    <div class="portfolio-grid">
    {% for post in collections.gallery %}
        <div class="portfolio-item">
            <a href="/{{ post.path }}">
                <img src="/gallery/{{ post.id }}/thumbnail.png" alt="Project">
                <div class="title">{{ post.hed }}</div>
            </a>
        </div>        
    {% endfor %}
    </div>

{% endblock %}

