from django.core.management.base import BaseCommand
import requests
from ubs.models import UBS

class Command(BaseCommand):
    help = "My shiny new management command."

    def handle(self, *args, **options):
        last_page = 1886
        for i in range(1, 2) :
            r = requests.get('https://api-ldc-hackathon.herokuapp.com/api/ubs/' + str(i))

            response = r.json()
            ubs = response.records
            for u in ubs:
                model_ubs = UBS()
                model_ubs.nom_estab = u.nom_estab

                model_ubs.save()