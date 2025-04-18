from django.apps import AppConfig


class ApiappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apiapp'

    def ready(self):
        import apiapp.signals  # Adjust path as needed
