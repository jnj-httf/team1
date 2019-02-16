from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets
from ubs.models import UBS
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance

class UbsSerializer(serializers.HyperlinkedModelSerializer):
    latitude = serializers.SerializerMethodField()
    longitude = serializers.SerializerMethodField()

    class Meta:
        model = UBS
        fields = (
            # 'vlr_latlon',
            'nom_estab',
            'cod_munic',
            'cod_cnes',
            'dsc_endereco',
            'dsc_bairro',
            'dsc_cidade',
            'dsc_telefone',
            'dsc_estrut_fisic_ambiencia',
            'dsc_adap_defic_fisic_idosos',
            'dsc_equipamentos',
            'dsc_medicamentos',
            'co_cep',
            'latitude',
            'longitude'
        )
    
    def get_latitude(self, obj):
        return obj.vlr_latlon.y
    
    def get_longitude(self, obj):
        return obj.vlr_latlon.x

class UbsViewSet(viewsets.ModelViewSet):
    queryset = UBS.objects.all()
    serializer_class = UbsSerializer

    def get_queryset(self):
        lat = self.request.query_params['lat']
        log = self.request.query_params['lon']
        point = Point(float(log), float(lat), srid=4326)

        return UBS.objects.annotate(distance=Distance('vlr_latlon', point)).order_by('distance')[:10]
