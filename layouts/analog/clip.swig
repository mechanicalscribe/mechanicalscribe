{% extends 'index.swig' %}

{% block title %}{% parent %} | {{ title }} {% endblock %}

{% block description %}{{ excerpt|striptags }}{% endblock %}

{% block content %}

<article class="main">
    <div id="{{ id }}" class="thing time-interactive"></div>
    <div class="note">
        <h1 class="headline">{{ title }}</h1>
    	<div class="content">{{ contents | safe }}</div>
    </div>  	
</article>
{% if is_repo %}

<aside class="versions">
    <strong>Revision history for this note:</strong>
    {% for version in versions %}
    <div class="version">
        <div class="date">{{ version.date|date('F j, Y') }}</div>
        <div class="message">{{ version.message }}</div>
    </div>
    {% endfor %}
</aside>

{% endif %}
{% endblock %}