from rest_framework import viewsets
from .models import NewsArticle, Contact, DiploEvent, HeroSlide, SitePopup, DiploTask, Interaction, Media, Vacancy, Scholarship, ServiceInfo
from .serializers import (
    NewsArticleSerializer, ContactSerializer, DiploEventSerializer, HeroSlideSerializer,
    SitePopupSerializer, DiploTaskSerializer, InteractionSerializer, MediaSerializer,
    VacancySerializer, ScholarshipSerializer, ServiceInfoSerializer
)

class NewsArticleViewSet(viewsets.ModelViewSet):
    queryset = NewsArticle.objects.all().order_by('-published_date')
    serializer_class = NewsArticleSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        qs = super().get_queryset()
        status = self.request.query_params.get('status')
        category = self.request.query_params.get('category')
        if status:
            qs = qs.filter(status=status)
        if category:
            qs = qs.filter(category=category)
        return qs

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class DiploEventViewSet(viewsets.ModelViewSet):
    queryset = DiploEvent.objects.all().order_by('date')
    serializer_class = DiploEventSerializer

class HeroSlideViewSet(viewsets.ModelViewSet):
    queryset = HeroSlide.objects.all().order_by('order')
    serializer_class = HeroSlideSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        active = self.request.query_params.get('active')
        if active is not None:
            qs = qs.filter(active=active.lower() == 'true')
        return qs

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

class VacancyViewSet(viewsets.ModelViewSet):
    queryset = Vacancy.objects.all().order_by('deadline')
    serializer_class = VacancySerializer

    def get_queryset(self):
        qs = super().get_queryset()
        is_active = self.request.query_params.get('is_active')
        if is_active is not None:
            qs = qs.filter(is_active=is_active.lower() == 'true')
        return qs

class ScholarshipViewSet(viewsets.ModelViewSet):
    queryset = Scholarship.objects.all().order_by('deadline')
    serializer_class = ScholarshipSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        is_active = self.request.query_params.get('is_active')
        if is_active is not None:
            qs = qs.filter(is_active=is_active.lower() == 'true')
        return qs

class ServiceInfoViewSet(viewsets.ModelViewSet):
    queryset = ServiceInfo.objects.all()
    serializer_class = ServiceInfoSerializer
