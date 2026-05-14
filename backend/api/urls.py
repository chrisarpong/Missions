from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NewsArticleViewSet, ContactViewSet, DiploEventViewSet, HeroSlideViewSet

router = DefaultRouter()
router.register(r'news', NewsArticleViewSet)
router.register(r'contacts', ContactViewSet)
router.register(r'events', DiploEventViewSet)
router.register(r'hero-slides', HeroSlideViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
