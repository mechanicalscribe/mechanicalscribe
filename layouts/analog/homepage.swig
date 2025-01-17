{% extends 'index.swig' %}

{% block content %}
    <section class="hero">
        <div class="title-container">
            <h1 class="title">{{ sitename }}</h1>
            <div class="tagline">{{ tagline }}</div>
        </div>
        <div class="explanation">{{ chapters["What I Do"] | safe  }}</div>
    </section>

    <section id="about_me" class="content-section">
        <h2>About Me</h2>
        <div class="description">{{ chapters["About Me"] | safe  }}</div>
    </section>

    <section id="what_know" class="content-section">
        <h2>What I Know</h2>
        <div class="description">{{ chapters["What I Know"] | safe  }}</div>
    </section>

    <section id="recent_posts" class="link-section">
        <h2>Blog Posts</h2>
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
    </section>

</article>

{% endblock %}