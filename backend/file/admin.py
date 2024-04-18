from django.contrib import admin
from .models import UserFile

class FileAdmin(admin.ModelAdmin):
    list_display = ['name', 'author', 'created_at']
    list_filter = ['author']
    search_fields = ['name']
    readonly_fields = ['created_at', 'updated_at']

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.author = request.user.profile
        super().save_model(request, obj, form, change)

admin.site.register(UserFile)
