from django.core.management.base import BaseCommand
import requests

class Command(BaseCommand):
    help = "My shiny new management command."

    def handle(self, *args, **options):
        last_page = 1886
        for i in range(1, 2) :
            r = requests.get('https://api-ldc-hackathon.herokuapp.com/api/ubs/' + str(i))

            response = r.json()
            
