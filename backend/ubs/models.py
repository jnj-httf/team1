from django.contrib.gis.db import models

# Create your models here.


class UBS(models.Model):
    # vlr_latitude = models.FloatField()
    # vlr_longitude = models.FloatField()
    vlr_latlon = models.PointField()
    cod_munic = models.IntegerField()
    cod_cnes = models.IntegerField()
    nom_estab = models.CharField(max_length=255)
    dsc_endereco = models.CharField(max_length=255)
    dsc_bairro = models.CharField(max_length=255)
    dsc_cidade = models.CharField(max_length=255)
    dsc_telefone = models.CharField(max_length=255)
    dsc_estrut_fisic_ambiencia = models.TextField()
    dsc_adap_defic_fisic_idosos = models.TextField()
    dsc_equipamentos = models.TextField()
    dsc_medicamentos = models.TextField()
    co_cep = models.CharField(max_length=15)