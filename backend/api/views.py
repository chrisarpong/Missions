from rest_framework import viewsets
from .models import NewsArticle, Contact, DiploEvent, HeroSlide, SitePopup, DiploTask, Interaction, Media
from .serializers import (
    NewsArticleSerializer, ContactSerializer, DiploEventSerializer, HeroSlideSerializer,
    SitePopupSerializer, DiploTaskSerializer, InteractionSerializer, MediaSerializer
)

class NewsArticleViewSet(viewsets.ModelViewSet):
    queryset = NewsArticle.objects.all().order_by('-published_date')
    serializer_class = NewsArticleSerializer
    lookup_field = 'slug'

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class DiploEventViewSet(viewsets.ModelViewSet):
    queryset = DiploEvent.objects.all().order_by('date')
    serializer_class = DiploEventSerializer

class HeroSlideViewSet(viewsets.ModelViewSet):
    queryset = HeroSlide.objects.all().order_by('order')
    serializer_class = HeroSlideSerializer

class SitePopupViewSet(viewsets.ModelViewSet):
    queryset = SitePopup.objects.all()
    serializer_class = SitePopupSerializer

class DiploTaskViewSet(viewsets.ModelViewSet):
    queryset = DiploTask.objects.all().order_by('due_date')
    serializer_class = DiploTaskSerializer

class InteractionViewSet(viewsets.ModelViewSet):
    queryset = Interaction.objects.all().order_by('-date')
    serializer_class = InteractionSerializer

class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all().order_by('-uploaded_at')
    serializer_class = MediaSerializer
