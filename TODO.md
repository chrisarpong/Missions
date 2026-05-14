# Ghana High Commission in Ottawa — Complete 2-Day TODO

> **Project:** Ghana High Commission, Ottawa (mission under Ministry of Foreign Affairs)
> **Goal:** Working public site + CRM admin, all talking to Django backend
> **Strategy:** Fix backend → wire frontend → activate CRM → polish content focus

---

## DAY 1 — Core Infrastructure

---

### 1.1 Replace Base44 Stub → Real Django API Client

**File:** `frontend/src/api/base44Client.js`

Replace entire file:

```javascript
const API_BASE = '/api';

async function request(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

function createEntityClient(entityName) {
  const base = `/${entityName}/`;
  return {
    list: (ordering) => request(`${base}?ordering=${ordering || ''}`),
    filter: (params = {}) => {
      const qs = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) qs.append(k, v);
      });
      return request(`${base}?${qs.toString()}`);
    },
    get: (id) => request(`${base}${id}/`),
    create: (data) => request(base, { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`${base}${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`${base}${id}/`, { method: 'DELETE' }),
  };
}

export const base44 = {
  entities: new Proxy({}, {
    get: (target, prop) => {
      const entityMap = {
        NewsArticle: 'news',
        Contact: 'contacts',
        DiploEvent: 'events',
        HeroSlide: 'hero-slides',
        SitePopup: 'site-popups',
        DiploTask: 'tasks',
        Interaction: 'interactions',
        Media: 'media',
      };
      return createEntityClient(entityMap[prop] || prop);
    },
  }),
  auth: {
    me: async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/me/`);
        if (res.ok) return res.json();
        return null;
      } catch {
        return null;
      }
    },
    logout: () => {},
    redirectToLogin: () => { window.location.href = '/crm/login'; },
  },
};
```

---

### 1.2 Add `image_url` to All Django Serializers

**Why:** Frontend everywhere checks `article.image_url` but Django only has `image` (ImageField). This adds a computed read-only field.

**File:** `backend/api/serializers.py`

Replace entire file:

```python
from rest_framework import serializers
from .models import NewsArticle, Contact, DiploEvent, HeroSlide


class NewsArticleSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

    class Meta:
        model = NewsArticle
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class DiploEventSerializer(serializers.ModelSerializer):
    poster_url = serializers.SerializerMethodField()

    def get_poster_url(self, obj):
        if obj.poster:
            return obj.poster.url
        return None

    class Meta:
        model = DiploEvent
        fields = '__all__'


class HeroSlideSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

    class Meta:
        model = HeroSlide
        fields = '__all__'
```

---

### 1.3 Fix News View — Add Slug Lookup + Auth Endpoint

**File:** `backend/api/views.py`

Replace entire file:

```python
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import NewsArticle, Contact, DiploEvent, HeroSlide
from .serializers import (
    NewsArticleSerializer,
    ContactSerializer,
    DiploEventSerializer,
    HeroSlideSerializer,
)


class NewsArticleViewSet(viewsets.ModelViewSet):
    queryset = NewsArticle.objects.all().order_by("-published_date")
    serializer_class = NewsArticleSerializer
    lookup_field = "slug"


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class DiploEventViewSet(viewsets.ModelViewSet):
    queryset = DiploEvent.objects.all().order_by("date")
    serializer_class = DiploEventSerializer


class HeroSlideViewSet(viewsets.ModelViewSet):
    queryset = HeroSlide.objects.all().order_by("order")
    serializer_class = HeroSlideSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def auth_me(request):
    if request.user.is_authenticated:
        return Response(
            {
                "id": request.user.id,
                "username": request.user.username,
                "email": request.user.email,
            }
        )
    return Response({"detail": "Not authenticated"}, status=401)
```

---

### 1.4 Fix API URLs — Register All Routes

**File:** `backend/api/urls.py`

Replace entire file:

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"news", views.NewsArticleViewSet)
router.register(r"contacts", views.ContactViewSet)
router.register(r"events", views.DiploEventViewSet)
router.register(r"hero-slides", views.HeroSlideViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/me/", views.auth_me, name="auth_me"),
]
```

---

### 1.5 Fix Main URLs — Add Media Serving

**File:** `backend/mission_core/urls.py`

Replace entire file:

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

---

### 1.6 Add 4 Missing Django Models

**Why:** The CRM has pages for SitePopup, DiploTask, Interaction, and Media. Without these backend models, those CRM pages crash.

**File:** `backend/api/models.py`

Add these at the bottom of the existing file:

```python
class SitePopup(models.Model):
    STYLE_CHOICES = [
        ("Info", "Info"),
        ("Alert", "Alert"),
        ("Announcement", "Announcement"),
        ("Emergency", "Emergency"),
    ]
    title = models.CharField(max_length=255)
    message = models.TextField()
    cta_text = models.CharField(max_length=255, blank=True)
    cta_url = models.URLField(blank=True)
    image = models.ImageField(upload_to="popups/", null=True, blank=True)
    style = models.CharField(
        max_length=50, choices=STYLE_CHOICES, default="Announcement"
    )
    active = models.BooleanField(default=True)
    show_once = models.BooleanField(default=False)
    delay_seconds = models.IntegerField(default=0)
    expires_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class DiploTask(models.Model):
    PRIORITY_CHOICES = [
        ("Low", "Low"),
        ("Medium", "Medium"),
        ("High", "High"),
        ("Urgent", "Urgent"),
    ]
    STATUS_CHOICES = [
        ("Not Started", "Not Started"),
        ("In Progress", "In Progress"),
        ("Done", "Done"),
        ("Cancelled", "Cancelled"),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    related_contact = models.ForeignKey(
        Contact, on_delete=models.SET_NULL, null=True, blank=True
    )
    priority = models.CharField(
        max_length=50, choices=PRIORITY_CHOICES, default="Medium"
    )
    status = models.CharField(
        max_length=50, choices=STATUS_CHOICES, default="Not Started"
    )
    due_date = models.DateField(null=True, blank=True)
    assigned_to = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Interaction(models.Model):
    TYPE_CHOICES = [
        ("Call", "Call"),
        ("Email", "Email"),
        ("Meeting", "Meeting"),
        ("Event", "Event"),
        ("Other", "Other"),
    ]
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    subject = models.CharField(max_length=255)
    summary = models.TextField(blank=True)
    date = models.DateField()
    outcome = models.TextField(blank=True)
    follow_up_date = models.DateField(null=True, blank=True)
    follow_up_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.type} - {self.subject}"


class Media(models.Model):
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to="media/")
    type = models.CharField(max_length=100, blank=True)
    size = models.IntegerField(default=0)
    tags = models.CharField(
        max_length=500, blank=True, help_text="Comma-separated tags"
    )
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
```

**File:** `backend/api/serializers.py` — Append new serializers:

```python
class SitePopupSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

    class Meta:
        model = SitePopup
        fields = "__all__"


class DiploTaskSerializer(serializers.ModelSerializer):
    related_contact_name = serializers.CharField(
        source="related_contact.full_name", read_only=True
    )

    class Meta:
        model = DiploTask
        fields = "__all__"


class InteractionSerializer(serializers.ModelSerializer):
    contact_name = serializers.CharField(
        source="contact.full_name", read_only=True
    )

    class Meta:
        model = Interaction
        fields = "__all__"


class MediaSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    def get_file_url(self, obj):
        if obj.file:
            return obj.file.url
        return None

    class Meta:
        model = Media
        fields = "__all__"
```

**File:** `backend/api/views.py` — Append new viewsets (add to existing file):

```python
# ——— New models ———
from .models import (
    NewsArticle,
    Contact,
    DiploEvent,
    HeroSlide,
    SitePopup,
    DiploTask,
    Interaction,
    Media,
)
from .serializers import (
    NewsArticleSerializer,
    ContactSerializer,
    DiploEventSerializer,
    HeroSlideSerializer,
    SitePopupSerializer,
    DiploTaskSerializer,
    InteractionSerializer,
    MediaSerializer,
)


class SitePopupViewSet(viewsets.ModelViewSet):
    queryset = SitePopup.objects.all()
    serializer_class = SitePopupSerializer


class DiploTaskViewSet(viewsets.ModelViewSet):
    queryset = DiploTask.objects.all()
    serializer_class = DiploTaskSerializer


class InteractionViewSet(viewsets.ModelViewSet):
    queryset = Interaction.objects.all()
    serializer_class = InteractionSerializer


class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
```

**File:** `backend/api/urls.py` — Register new routes (add to router):

```python
router.register(r"site-popups", views.SitePopupViewSet)
router.register(r"tasks", views.DiploTaskViewSet)
router.register(r"interactions", views.InteractionViewSet)
router.register(r"media", views.MediaViewSet)
```

**File:** `backend/api/admin.py` — Register new models:

```python
from django.contrib import admin
from .models import (
    NewsArticle,
    Contact,
    DiploEvent,
    HeroSlide,
    SitePopup,
    DiploTask,
    Interaction,
    Media,
)

admin.site.register(NewsArticle)
admin.site.register(Contact)
admin.site.register(DiploEvent)
admin.site.register(HeroSlide)
admin.site.register(SitePopup)
admin.site.register(DiploTask)
admin.site.register(Interaction)
admin.site.register(Media)
```

**Then run:**

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

---

### 1.7 Fix News.jsx — Use Django API Instead of Base44

**File:** `frontend/src/pages/News.jsx`

Changes:

- **Line 3:** Remove `import { base44 } from '@/api/base44Client'`
- **Lines 24-28:** Replace the useEffect:

```jsx
useEffect(() => {
  fetch("/api/news/?status=Published")
    .then((res) => res.json())
    .then((data) => {
      const articles = Array.isArray(data) ? data : data.results || [];
      setArticles(articles);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);
```

- **Line 102:** Change `featured.image_url` → `featured.image || featured.image_url`
- **Line 139:** Change `article.image_url` → `article.image || article.image_url`
- **Line 53:** Change `"Ghana's Ministry of Foreign Affairs"` → `"the Ghana High Commission in Ottawa"`

---

### 1.8 Fix NewsArticleDetail.jsx — Use Django API

**File:** `frontend/src/pages/NewsArticleDetail.jsx`

Changes:

- **Line 4:** Remove `import { base44 } from '@/api/base44Client'`
- **Line 2:** Remove `useNavigate` from imports (unused)
- **Lines 22-35:** Replace useEffect:

```jsx
useEffect(() => {
  fetch(`/api/news/${slug}/`)
    .then((res) => {
      if (!res.ok) throw new Error("Not found");
      return res.json();
    })
    .then((article) => {
      setArticle(article);
      fetch("/api/news/?status=Published")
        .then((r) => r.json())
        .then((data) => {
          const all = Array.isArray(data) ? data : data.results || [];
          setRelatedArticles(
            all.filter((a) => a.slug !== slug).slice(0, 3)
          );
        })
        .catch(() => {});
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, [slug]);
```

---

### 1.9 Fix PressRoom.jsx — Use Django API

**File:** `frontend/src/pages/PressRoom.jsx`

Changes:

- **Line 3:** Remove `import { base44 } from '@/api/base44Client'`
- **Lines 80-82:** Replace useEffect:

```jsx
useEffect(() => {
  fetch("/api/news/?status=Published")
    .then((res) => res.json())
    .then((data) => {
      const articles = Array.isArray(data) ? data : data.results || [];
      setDbArticles(articles);
    })
    .catch(() => {});
}, []);
```

- **Line 135:** Change text: `"Ghana's Ministry of Foreign Affairs"` → `"the Ghana High Commission in Ottawa"`

---

### 1.10 Fix SitePopupDisplay.jsx — Use Django API

**File:** `frontend/src/components/SitePopupDisplay.jsx`

Changes:

- **Line 4:** Remove `import { base44 } from '@/api/base44Client'`
- **Lines 17-33:** Replace useEffect:

```jsx
useEffect(() => {
  fetch("/api/site-popups/?active=true")
    .then((res) => res.json())
    .then((popups) => {
      const items = Array.isArray(popups) ? popups : popups.results || [];
      if (!items || items.length === 0) return;
      const active = items[0];
      if (active.expires_date && new Date(active.expires_date) < new Date())
        return;
      const seenKey = `popup_seen_${active.id}`;
      if (active.show_once && sessionStorage.getItem(seenKey)) return;
      setPopup(active);
      const delay = (active.delay_seconds || 0) * 1000;
      setTimeout(() => setVisible(true), delay);
    })
    .catch(() => {});
}, []);
```

---

### 1.11 Fix All CRM Pages — Use Django API

**Files to fix:** All in `frontend/src/pages/crm/`:
- `CRMDashboard.jsx`
- `CRMNews.jsx`
- `CRMPopups.jsx`
- `CRMHeroSlides.jsx`
- `CRMEvents.jsx`
- `CRMContacts.jsx`
- `CRMTasks.jsx`
- `CRMInteractions.jsx`
- `CRMMedia.jsx`

**Pattern for each CRM page:**

Replace:
```jsx
import { base44 } from "@/api/base44Client";
// ...
base44.entities.NewsArticle.list();
```

With:
```jsx
const API = "/api/news"; // or /api/site-popups, /api/hero-slides, etc.

const load = () => {
  fetch(API + "/")
    .then((res) => res.json())
    .then((data) => {
      const items = Array.isArray(data) ? data : data.results || [];
      setItems(items);
      setLoading(false);
    })
    .catch(() => setLoading(false));
};
```

**Entity-to-API mapping:**

| CRM Page       | Entity Name   | API Endpoint          |
| -------------- | ------------- | --------------------- |
| CRMNews        | NewsArticle   | `/api/news/`          |
| CRMPopups      | SitePopup     | `/api/site-popups/`   |
| CRMHeroSlides  | HeroSlide     | `/api/hero-slides/`   |
| CRMEvents      | DiploEvent    | `/api/events/`        |
| CRMContacts    | Contact       | `/api/contacts/`      |
| CRMTasks       | DiploTask     | `/api/tasks/`         |
| CRMInteractions| Interaction   | `/api/interactions/`  |
| CRMMedia       | Media         | `/api/media/`         |

**CRMDashboard.jsx — Special case (queries all 7 entities at once):**

Replace lines 17-25:

```jsx
useEffect(() => {
  Promise.all([
    fetch("/api/news/").then((r) => r.json()),
    fetch("/api/site-popups/").then((r) => r.json()),
    fetch("/api/hero-slides/").then((r) => r.json()),
    fetch("/api/events/").then((r) => r.json()),
    fetch("/api/contacts/").then((r) => r.json()),
    fetch("/api/tasks/").then((r) => r.json()),
    fetch("/api/interactions/").then((r) => r.json()),
  ])
    .then(([n, p, s, e, c, t, i]) => {
      const normalize = (data) =>
        Array.isArray(data) ? data : data.results || [];
      setNews(normalize(n));
      setPopups(normalize(p));
      setSlides(normalize(s));
      setEvents(normalize(e));
      setContacts(normalize(c));
      setTasks(normalize(t));
      setInteractions(normalize(i));
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);
```

---

### 1.12 Create AuthContext

**Why:** `ProtectedRoute.jsx` imports `useAuth` from `@/lib/AuthContext` — file doesn't exist, app crashes if any route uses ProtectedRoute.

**Create file:** `frontend/src/lib/AuthContext.jsx`

```jsx
import React, { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (username, password) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout/");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

**File:** `frontend/src/App.jsx` — Wrap app with AuthProvider:

Add import at top:
```jsx
import { AuthProvider } from "@/lib/AuthContext";
```

Wrap inside `QueryClientProvider`:
```jsx
<QueryClientProvider client={queryClientInstance}>
  <AuthProvider>
    <Router>
      <Routes>...</Routes>
    </Router>
  </AuthProvider>
  <Toaster />
</QueryClientProvider>
```

---

### 1.13 Uncomment CRM Routes in App.jsx

**File:** `frontend/src/App.jsx`

Add imports:
```jsx
import CRMLayout from "./pages/crm/CRMLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom"; // if not already imported
```

Remove the comment around line 76 and replace with:

```jsx
{/* CRM */}
<Route
  path="/crm/*"
  element={
    <ProtectedRoute unauthenticatedElement={<Navigate to="/" />} />
  }
>
  <Route path="*" element={<CRMLayout />} />
</Route>
```

**For development (quick way to test):** Comment out ProtectedRoute and just use:
```jsx
<Route path="/crm/*" element={<CRMLayout />} />
```

---

### 1.14 Fix CRM Modal Components (image_url → image)

**Files to fix:**
- `frontend/src/components/crm/NewsArticleModal.jsx`
- `frontend/src/components/crm/HeroSlideModal.jsx`
- `frontend/src/components/crm/EventModal.jsx`
- `frontend/src/components/crm/PopupModal.jsx`

These modals reference `image_url`, `poster_url`, etc. Change to handle both Django field names and the computed `image_url` field. Pattern:

```jsx
// Before:
item.image_url

// After:
item.image_url || item.image
```

---

### 1.15 Fix HeroSection — Fetch from API

**File:** `frontend/src/components/home/HeroSection.jsx`

Replace the MOCK_SLIDES usage with API fetch. Remove the hardcoded MOCK_SLIDES array.

Replace the `useEffect`:

```jsx
useEffect(() => {
  fetch("/api/hero-slides/?active=true")
    .then((res) => res.json())
    .then((data) => {
      const items = Array.isArray(data) ? data : data.results || [];
      if (items.length > 0) setSlides(items);
    })
    .catch(() => {});
}, []);
```

Update the template to handle API field names:
- `slide.date` → `slide.date_label || slide.date`
- `slide.image` → `slide.image_url || slide.image`
- `slide.description` → `slide.description || slide.subtitle`

---

### 1.16 Fix UpcomingEventsHome — Fetch from API

**File:** `frontend/src/components/home/UpcomingEventsHome.jsx`

Replace MOCK_EVENTS with API fetch:

```jsx
useEffect(() => {
  fetch("/api/events/")
    .then((res) => res.json())
    .then((data) => {
      const items = Array.isArray(data) ? data : data.results || [];
      setEvents(items);
    })
    .catch(() => {});
}, []);
```

Remove the `MOCK_EVENTS` constant.

---

## DAY 2 — Content Focus & Polish

---

### 2.1 Fix CRMLayout Branding — "Ministry" → "High Commission"

**File:** `frontend/src/pages/crm/CRMLayout.jsx`

- **Line 41:** Change `"Ministry of Foreign Affairs"` → `"Ghana High Commission, Ottawa"`

---

### 2.2 Fix News Page Subtitle

**File:** `frontend/src/pages/News.jsx`

- **Line 53:** Change to reflect High Commission, not Ministry:
  ```
  "Stay informed with the latest news and updates from the Ghana High Commission in Ottawa."
  ```

---

### 2.3 Fix PressRoom Subtitle

**File:** `frontend/src/pages/PressRoom.jsx`

- **Line 135:** Change text to High Commission focus:
  ```
  "Authoritative press releases, ministerial statements, and official communications from the Ghana High Commission in Ottawa."
  ```

- **STATIC_ARTICLES** (lines 17-39): These are Ghana-MFA-focused press releases. Either:
  - Replace with articles relevant to the High Commission in Ottawa
  - Or remove them entirely once real data exists in the API

---

### 2.4 Fix DirectorProfile — Already Mostly Correct

**File:** `frontend/src/components/home/DirectorProfile.jsx`

Review these lines to ensure they reference the High Commission (not the Ministry):

- **Line 22:** `"Serving Ghanaians and strengthening Ghana-Canada relations"` — good ✅
- **Line 26-27:** `"The High Commission of Ghana in Canada..."` — good ✅
- **Lines 38-40:** High Commissioner info — good ✅
- **Lines 42-46:** Minister for Foreign Affairs — this is ok as context (shows parent ministry leadership)

---

### 2.5 Fix About Page — Shift Focus to High Commission

**File:** `frontend/src/pages/About.jsx`

The About page currently describes the Ministry of Foreign Affairs. For a mission site, it should:

- Describe the **High Commission's role** in Canada
- Mention it operates under the Ministry of Foreign Affairs
- Focus on services for Ghanaians in Canada and Canada-Ghana relations

Read the current content and identify lines that say "Ministry" and should say "High Commission."

---

### 2.6 Fix History Page

**File:** `frontend/src/pages/History.jsx`

Ghana MFA history timeline (1957+) is Ministry-level. For the High Commission site:

- Keep the Ghana diplomatic history as context
- Add key dates specific to the High Commission in Ottawa (e.g., when it was established)
- Frame from the mission's perspective

---

### 2.7 Fix Bureaux & Units Page

**File:** `frontend/src/pages/BureauxUnits.jsx`

Lists 30 Ministry-level bureaux. For the High Commission site replace with the High Commission's actual sections/departments (e.g., Consular Section, Political Section, Trade Section, Administration, etc.).

---

### 2.8 Fix Leadership Page (when route is created)

**File:** `frontend/src/pages/Leadership.jsx`

Currently shows Ministry leadership (Minister, Deputy Minister, etc.). For the High Commission, show:
- High Commissioner (already in DirectorProfile)
- Deputy High Commissioner
- Heads of Sections (Consular, Political, Trade, Admin)

---

### 2.9 Fix Missing Routes

**File:** `frontend/src/App.jsx`

Add:
```jsx
<Route path="/events" element={<ComingSoon />} />
<Route path="/leadership" element={<Leadership />} />
```

---

### 2.10 Wire "View All Events" Link

**File:** `frontend/src/components/home/UpcomingEventsHome.jsx`

- **Line 94:** Change `to="/news"` → `to="/events"`

---

### 2.11 Clean Up Dead Code

- Delete `frontend/src/components/home/ProgrammesPreview.jsx` (not imported anywhere)
- In `NewsArticleDetail.jsx`: Remove unused `useNavigate`, `Share2` imports
- In `PressRoom.jsx`: Remove unused `Mic`, `Radio`, `BookOpen`, `Download` imports

---

### 2.12 Fix Social Media Links

**Files:** `Navbar.jsx`, `Footer.jsx`

Replace all `href="#"` with actual social media URLs for the Ghana High Commission in Ottawa:
- Facebook: https://facebook.com/GhanaHighCommissionOttawa
- Twitter/X: ...
- Instagram: ...
- YouTube: ...
- LinkedIn: ...

(Use the real social media handles of the mission)

---

### 2.13 Security Quick Fixes

**File:** `backend/mission_core/settings.py`

For dev — leave as-is (DEBUG=True, CORS open).

For production:
```python
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "fallback-dev-only")
DEBUG = os.environ.get("DJANGO_DEBUG", "False") == "True"
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1").split(
    ","
)
CORS_ALLOW_ALL_ORIGINS = DEBUG
CORS_ALLOWED_ORIGINS = (
    os.environ.get("CORS_ALLOWED_ORIGINS", "http://localhost:5173").split(",")
    if not CORS_ALLOW_ALL_ORIGINS
    else []
)
```

---

### 2.14 Remove Stripe (If Unused)

```bash
cd frontend && npm uninstall @stripe/react-stripe-js @stripe/stripe-js
```

Then check if any files import from `@stripe/` — if none, the removal is clean.

---

## Verification Checklist

### Public Pages
- [ ] `/` — Hero slides load from API, news loads, events load
- [ ] `/news` — News list shows articles from Django API
- [ ] `/news/:slug` — Article detail loads by slug
- [ ] `/press-releases`, `/press-room`, `/public-announcements` — Press releases load
- [ ] Popups display correctly from Django API
- [ ] All pages show Ghana High Commission branding (not generic Ministry)

### CRM Admin
- [ ] `/crm` — Dashboard loads all 8 entity counts (real numbers, not 0s)
- [ ] `/crm/news` — Can create, edit, delete, toggle featured news articles
- [ ] `/crm/popups` — Can manage site popups
- [ ] `/crm/hero` — Can manage hero slides (these appear on homepage)
- [ ] `/crm/events` — Can manage events
- [ ] `/crm/contacts` — Can manage contacts
- [ ] `/crm/tasks` — Can manage tasks
- [ ] `/crm/interactions` — Can log diplomatic interactions
- [ ] `/crm/media` — Can upload and manage media files

### Django Admin
- [ ] `/admin/` — All 8 models registered and CRUD-able
- [ ] Can create Django users/staff for CRM access

### Image Handling
- [ ] Images uploaded via Django admin appear on frontend
- [ ] No broken image icons on News cards or article detail
- [ ] Hero slide images display correctly

### Content Focus
- [ ] Site presents as "Ghana High Commission, Ottawa" not "Ministry of Foreign Affairs"
- [ ] About page describes the High Commission's role
- [ ] Services reflect what a mission provides
- [ ] Contact info is the High Commission's, not Accra

---

## Git Strategy

```bash
# After Day 1 (core infra + CRM)
git add -A
git commit -m "fix: replace base44 stub, add 4 missing models, wire CRM to Django API"

# After Day 2 (content focus + polish)
git add -A
git commit -m "feat: refocus site as Ghana High Commission in Ottawa with working CRM"
```
