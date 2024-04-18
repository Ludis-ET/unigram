from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

import debug_toolbar
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Unigram API",
        default_version='v1',
        description="""
The Unigram API is a RESTful web service that provides access to various features and functionalities of the Unigram platform. 
Users can use this API to interact with their account, manage their posts, comments, and images, and perform various other actions 
related to the Unigram platform. 

The API offers endpoints for authentication, user management, post management, comment management, image management, and more. 
Developers can integrate this API into their applications to enable seamless interaction with the Unigram platform and enhance the 
user experience.

For more details and usage instructions, please refer to the API documentation available at: [API Documentation](https://www.example.com/api/docs/)
""",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(
            name="Ludis",
            url="https://www.example.com/contact/",
            email="leulsegedmelaku1020@gmail.com"
        ),
        license=openapi.License(
            name="Alpha",
            url="https://www.example.com/license/"
        ),
        version='v1.0.0',
        x_logo_url='https://www.example.com/logo.png',
        x_terms_of_service_url='https://www.example.com/terms/',
        x_instagram_handle='@lulsgd',
        x_organization={
            'name': 'Unigram',
            'url': 'https://www.example.com/',
        },
        x_apis_guru={
            'url': 'https://apis.guru/browse-apis/',
            'registry_versions': ['0.9.0'],
        },
        x_api_key_name='Alpha',
        x_api_key_url='https://www.example.com/api-key',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)



urlpatterns = [
    path('admin/', admin.site.urls),

    path('api<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('api/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('auth/',include('djoser.urls')),
    path('auth/',include('djoser.urls.jwt')),
    path('__debug__/', include(debug_toolbar.urls)),

    path('api/',include('core.urls')),
    path('api/',include('post.urls')),
    path('api/',include('user.urls')),
    path('api/',include('file.urls')),
    path('', TemplateView.as_view(template_name='index.html')),

]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)