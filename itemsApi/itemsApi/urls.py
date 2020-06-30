"""itemsApi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Items import views as item_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('items/', item_views.item_list),
    path('items/<int:id>/', item_views.item_get),
    path('rating/<int:id>/', item_views.new_item_rate),
    path('user/new/', item_views.new_user),
    path('user/get/', item_views.get_user)
]
