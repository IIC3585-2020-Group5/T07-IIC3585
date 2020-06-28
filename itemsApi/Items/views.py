from django.shortcuts import render
from .models import Items
# Create your views here.
from django.http.response import JsonResponse, HttpResponse
from django.http import HttpResponseNotFound
from django.core.exceptions import ObjectDoesNotExist
import json

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


