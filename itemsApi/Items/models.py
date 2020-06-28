from django.db import models

# Create your models here.
class Items(models.Model):
    name = models.TextField(null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    image_url = models.URLField(max_length=300)
    price = models.IntegerField(null=False, blank=False, default=0)
    discount_price = models.IntegerField(null=False, blank=False, default=0)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    rating = models.IntegerField(null=False, blank=False, default=0)
    total_rating_amount = models.IntegerField(null=False, blank=False, default=0)

    def __str__(self):
        return self.name
