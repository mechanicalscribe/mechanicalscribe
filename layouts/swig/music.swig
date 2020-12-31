{% extends 'index.swig' %}

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
	<embed src="{{ pdf }}" width="500" height="800" alt="{{ song }}" pluginspage="http://www.adobe.com/products/acrobat/readstep2.html">
	<div class="boilerplate"><span class="date">{{ date|date('F j, Y') }}</span></div>
</article>
{% if vextab %}

<link rel="stylesheet" href="/js/vendor/vextab/vextab.css">
<script src="/js/vendor/vextab/vextab-div.js"></script>

{% endif %}


{% endblock %}