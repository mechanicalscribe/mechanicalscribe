{% extends 'index.swig' %}

{% block title %}{% parent %} | {{ title }} {% endblock %}

{% block description %}{{ excerpt|striptags }}{% endblock %}

{% block content %}

<article class="main">
    <div class="note">
        <h1 class="headline">{{ title }}</h1>
        <div class="interactive-container">
            <div id="{{ id }}" class="thing time-interactive scribe-interactive"></div>
            <a href="{{ source_url }}" class="source-tab" target="_blank" rel="noopener noreferrer"><span>Source</span></a>
        </div>
    	<div class="content">{{ contents | safe }}</div>
    </div>  	
</article>

{% endblock %}