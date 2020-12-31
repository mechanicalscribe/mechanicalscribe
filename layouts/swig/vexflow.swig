{% extends 'index.swif' %}

{% block title %}{% parent %} | {{ title }} {% endblock %}

{% block content %}

<article class="main music">
    <div class="note">
    	<div class="details">
			<p><strong>Song: </strong> "{{ song_link|safe }}", by {{ artist }}</p>
			<!--<p><strong>Album: </strong><a href="{{ album_url }}" target="_blank">{{ album }}</a></p>-->
		</div>
    	{{ contents | safe }}
    </div>
	<div class="youtube_audio thing">
		<div class="inner">
			<iframe width="500" height="300" src="{{ video }}" frameborder="0"></iframe>
		</div>
	</div>
	{% if scribd_id %}
	<div class="thing score_container">
		<iframe class="scribd_iframe_embed" src="https://www.scribd.com/embeds/{{scribd_id}}/content?start_page=1&view_mode=scroll&show_recommendations=true" data-auto-height="false" data-aspect-ratio="undefined" scrolling="no" id="doc_88517" width="100%" height="600" frameborder="0"></iframe>
	</div>
	{% endif %}
	<div class="boilerplate"><span class="date">{{ date|date('F j, Y') }}</span></div>
</article>
{% if vextab %}

<link rel="stylesheet" href="/js/vendor/vextab/vextab.css">
<script src="/js/vendor/vextab/vextab-div.js"></script>

{% endif %}


{% endblock %}