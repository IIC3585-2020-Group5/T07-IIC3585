from django.shortcuts import render
from .models import Items
from django.contrib.auth.models import User
# Create your views here.
from django.http.response import JsonResponse, HttpResponse
from django.http import HttpResponseNotFound
from django.core.exceptions import ObjectDoesNotExist
import json
from django.contrib.auth import authenticate


def item_list(request):
    return JsonResponse(list(Items.objects.all().values()), safe=False)


def item_get(request, id):
    try:
        item = list(Items.objects.filter(id=id).values())
    except ObjectDoesNotExist:
        return HttpResponseNotFound("Not Found") 
    if len(item):
        return JsonResponse(item, safe=False)
    else:
        return HttpResponseNotFound("Not Found")


def new_item_rate(request, id):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(body)
        rating = body["rating"]
        item = Items.objects.get(id=id)
        item.rating += int(rating)
        item.total_rating_amount += 1
        item.save()
        item = list(Items.objects.filter(id=id).values())
        return JsonResponse(item, safe=False)


def new_user(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        username = body["username"]
        password = body["password"]
        try: 
            user = User.objects.get(username=username)
            return HttpResponse(status=303)
        except ObjectDoesNotExist:       
            user = User.objects.create_user(username=username, password=password)
            user.save()
            user_json = {"username": user.username}
            return JsonResponse(user_json, safe=True)


def get_user(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        username = body["username"]
        password = body["password"]

        user = authenticate(request, username=username, password=password)
        if user is not None:
            user_json = {"username": user.username}
            return JsonResponse(user_json, safe=True)
        else:
            return HttpResponseNotFound("Not Found") 

