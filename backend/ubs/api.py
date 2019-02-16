from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets
from ubs.models import UBS


class UbsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UBS
        fields = ('nom_estab',)

class UserViewSet(viewsets.ModelViewSet):
    queryset = UBS.objects.all()
    serializer_class = UbsSerializer


