from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Organization, Hashtag, Report

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'logo_preview', 'student_email', 'address')
    search_fields = ('name', 'student_email')
    
    def logo_preview(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url=obj.logo.url,
            width=100,  # Adjust the width as needed
            height=100,  # Adjust the height as needed
        ))

    logo_preview.short_description = 'Logo Preview'

@admin.register(Hashtag)
class HashtagAdmin(admin.ModelAdmin):
    list_display = ('name', 'subscribers_count')
    list_filter = ('organization',)

    def subscribers_count(self, obj):
        return obj.subscribers.count()

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('reported_content_type', 'reported_object_id', 'person', 'description', 'time')
    list_filter = ('reported_content_type', 'time')
