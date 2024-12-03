{% block content %}

    <div class="portfolio-grid">
    {% for post in collections.portfolio %}
        <div class="portfolio-item">
            <a href="{{ post.path }}">
                <img src="/portfolio/{{ post.id }}/thumbnail.png" alt="Project">
                <div class="title">{{ post.hed }}</div>
            </a>
        </div>        
    {% endfor %}
    </div>

{% endblock %}