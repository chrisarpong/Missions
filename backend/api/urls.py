from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    NewsArticleViewSet, ContactViewSet, DiploEventViewSet, HeroSlideViewSet,
    SitePopupViewSet, DiploTaskViewSet, InteractionViewSet, MediaViewSet,
    VacancyViewSet, ScholarshipViewSet, ServiceInfoViewSet
)

router = DefaultRouter()
router.register(r'news', NewsArticleViewSet)
router.register(r'contacts', ContactViewSet)
router.register(r'events', DiploEventViewSet)
router.register(r'hero-slides', HeroSlideViewSet)
router.register(r'site-popups', SitePopupViewSet)
router.register(r'tasks', DiploTaskViewSet)
router.register(r'interactions', InteractionViewSet)
router.register(r'media', MediaViewSet)
router.register(r'vacancies', VacancyViewSet)
router.register(r'scholarships', ScholarshipViewSet)
router.register(r'services', ServiceInfoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
