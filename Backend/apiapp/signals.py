import requests
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Product
import os

ATTRIBUTE_URL = os.getenv("ATTRIBUTE_SERVICE_URL", "http://localhost:4000")

@receiver(post_save, sender=Product)
def sync_product_attributes(sender, instance, **kwargs):
    # Define category string from the related model or fallback
    category = instance.category.name if instance.category else "uncategorized"

    # Build the attribute payload (you may need to customize this)
    attributes = {
        "color": "silver",  # Placeholder — build dynamically if needed
        # Add more dynamic keys as needed
    }

    payload = {
        "product_id": instance.id,
        "category": category,
        "attributes": attributes
    }

    try:
        print("attempting to send part info",payload)

        response = requests.post(
            url = ("ATTRIBUTE_URL" + "/attributes"),
            json=payload,
            headers={"Authorization": f"Bearer {os.environ.get('ATTRIBUTE_SERVICE_TOKEN')}"}
        )
        response.raise_for_status()
    except requests.RequestException as e:
        # Log or handle errors as needed
        print(f"Error syncing product attributes: {e}")
