from rest_framework import serializers
from .models import NewsArticle, Contact, DiploEvent, HeroSlide, SitePopup, DiploTask, Interaction, Media, Vacancy, Scholarship, ServiceInfo

class NewsArticleSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = NewsArticle
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class DiploEventSerializer(serializers.ModelSerializer):
    poster_url = serializers.SerializerMethodField()

    class Meta:
        model = DiploEvent
        fields = '__all__'

    def get_poster_url(self, obj):
        if obj.poster:
            return obj.poster.url
        return None

class HeroSlideSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HeroSlide
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class SitePopupSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = SitePopup
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class DiploTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiploTask
        fields = '__all__'

class InteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interaction
        fields = '__all__'

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'

class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = '__all__'

class ScholarshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholarship
        fields = '__all__'

class ServiceInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceInfo
        fields = '__all__'
