{% extends 'index.swig' %}

{% block title %}{% parent %} | {{ title }} {% endblock %}

{% block content %}

<article class="main">
    {{ contents | safe }}
</article>

{% endblock %}