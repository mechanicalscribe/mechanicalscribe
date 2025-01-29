{% extends 'index.swig' %}

{% block content %}
    <section class="hero">
        <div class="title-container">
            <h1 class="title">{{ sitename }}</h1>
            <div class="tagline">{{ tagline }}</div>
        </div>
        <div class="explanation">{{ chapters["Hero Card"] | safe  }}</div>
    </section>

    <section id="best-of" class="content-section">
        <h2>Gallery</h2>

        <div class="portfolio-grid">
        {% for post in gallery_posts %}
            <div class="portfolio-item">
                <a href="/{{ post.path }}">
                    <img src="/gallery/{{ post.id }}/homepage.png" alt="Project">
                    <div class="title">{{ post.hed | safe }}</div>
                </a>
            </div>        
        {% endfor %}
        </div>
    </section>

    <section id="about_me" class="content-section text-heavy">
        <h2>About Me</h2>
        <div class="description">{{ chapters["About Me"] | safe  }}</div>
    </section>

    <section id="how_help" class="content-section text-heavy">
        <h2>Skills Of Some Relevance</h2>
        <div class="description">{{ chapters["Skills Of Some Relevance"] | safe  }}</div>
    </section>

    <section id="c_v" class="content-section text-heavy">
        <h2>C.V.</h2>
        <div class="description">{{ chapters["C.V."] | safe  }}</div>
    </section>


    <section id="book_appt" class="content-section">
        <h2>Let's Chat!</h2>
        <div class="description"><!-- Google Calendar Appointment Scheduling begin -->
<iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3dGXc5DBJwGdmv0ED_ZCpR6KyVf_0gHBx0yCRXnAeaNGOvwwAC-VewhUodmuUhzN2cA7IuOYFO?gv=true" style="border: 0" width="100%" height="600" frameborder="0"></iframe>
<!-- end Google Calendar Appointment Scheduling -->
</div>
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

{% block extrajs %}
<script>
const textHeavySections = document.querySelectorAll('.text-heavy');


textHeavySections.forEach(section => {
    const readMoreButton = document.createElement('button');
    readMoreButton.setAttribute('class', 'read-more-btn');

    const readMoreIcon = document.createElement('span');
    readMoreIcon.setAttribute('class', 'icon');
    readMoreIcon.innerHTML = "+";
    readMoreButton.appendChild(readMoreIcon);

    section.appendChild(readMoreButton);

    console.log(readMoreButton);

  // Add click event listener to each button
  readMoreButton.addEventListener('click', function() {
    // Find the paragraphs within the same container as the button
    const paragraphs = this.closest('.text-heavy').querySelectorAll('p:not(:first-child),ul:not(:first-child)');
    
    // Toggle visibility of each paragraph
    paragraphs.forEach(paragraph => {
        console.log(paragraph.style.display);
      paragraph.style.display = paragraph.style.display === 'block' ? 'none' : 'block';
    });

    // Toggle button icon between "+" and "–"
    if (this.classList.contains('show-less')) {
      this.classList.remove('show-less');
      this.querySelector('.icon').textContent = '+'; // Chevron down
    } else {
      this.classList.add('show-less');
      this.querySelector('.icon').textContent = '-'; // Chevron up
    }
    });
});
</script>
{% endblock %}
