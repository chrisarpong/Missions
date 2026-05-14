from django.db import models
from django.utils.text import slugify

class NewsArticle(models.Model):
    STATUS_CHOICES = [('Draft', 'Draft'), ('Published', 'Published')]
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    author = models.CharField(max_length=255, blank=True)
    summary = models.TextField(blank=True)
    body = models.TextField()
    category = models.CharField(max_length=100)
    tags = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to='news/', null=True, blank=True)
    published_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Draft')
    featured = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title

class Contact(models.Model):
    full_name = models.CharField(max_length=255)
    title = models.CharField(max_length=255, blank=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=50, blank=True)
    organization = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=100, blank=True)
    category = models.CharField(max_length=100)
    tags = models.CharField(max_length=255, blank=True)
    notes = models.TextField(blank=True)
    last_contacted = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50, default='Active')

    def __str__(self):
        return self.full_name

class DiploEvent(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField(null=True, blank=True)
    location = models.CharField(max_length=255)
    host = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    type = models.CharField(max_length=100)
    attendees = models.IntegerField(default=0, blank=True)
    status = models.CharField(max_length=50, default='Upcoming')
    poster = models.ImageField(upload_to='events/', null=True, blank=True)

    def __str__(self):
        return self.title

class HeroSlide(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.TextField()
    date_label = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='hero/')
    cta_text = models.CharField(max_length=100, blank=True)
    cta_url = models.URLField(blank=True)
    order = models.IntegerField(default=0)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class SitePopup(models.Model):
    STYLE_CHOICES = [
        ('Info', 'Info'),
        ('Alert', 'Alert'),
        ('Announcement', 'Announcement')
    ]
    title = models.CharField(max_length=255)
    message = models.TextField()
    cta_text = models.CharField(max_length=100, blank=True)
    cta_url = models.URLField(blank=True)
    image = models.ImageField(upload_to='popups/', null=True, blank=True)
    style = models.CharField(max_length=50, choices=STYLE_CHOICES, default='Info')
    active = models.BooleanField(default=False)
    show_once = models.BooleanField(default=True)
    delay_seconds = models.IntegerField(default=0)
    expires_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title

class DiploTask(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    related_contact = models.ForeignKey(Contact, on_delete=models.SET_NULL, null=True, blank=True, related_name='tasks')
    priority = models.CharField(max_length=50, default='Medium')
    status = models.CharField(max_length=50, default='Pending')
    due_date = models.DateField(null=True, blank=True)
    assigned_to = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title

class Interaction(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name='interactions')
    type = models.CharField(max_length=100)
    subject = models.CharField(max_length=255)
    summary = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)
    outcome = models.CharField(max_length=255, blank=True)
    follow_up_date = models.DateField(null=True, blank=True)
    follow_up_notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.type} with {self.contact.full_name} on {self.date.strftime('%Y-%m-%d')}"

class Media(models.Model):
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='media_library/')
    type = models.CharField(max_length=50, blank=True)
    size = models.CharField(max_length=50, blank=True)
    tags = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
