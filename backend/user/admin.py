from django.contrib import admin
from django.utils.html import format_html

from .models import *

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'profile_pic_preview', 'org_email', 'verified_org']
    readonly_fields = ['profile_pic_preview']

    def profile_pic_preview(self, obj):
        if obj.profile_pic:
            return format_html('<img src="{}" style="max-height:100px;max-width:100px;" />'.format(obj.profile_pic.url))
        else:
            return None
    profile_pic_preview.short_description = 'Profile Picture'

@admin.register(Badge)
class BadgeAdmin(admin.ModelAdmin):
    list_display = ['badge_name', 'badge_image_preview', 'badge_description']
    readonly_fields = ['badge_image_preview']

    def badge_image_preview(self, obj):
        if obj.badge_image:
            return format_html('<img src="{}" style="max-height:100px;max-width:100px;" />'.format(obj.badge_image.url))
        else:
            return None
    badge_image_preview.short_description = 'Badge Image'

@admin.register(UserBadge)
class UserBadgeAdmin(admin.ModelAdmin):
    list_display = ['user', 'badge']

@admin.register(Point)
class PointAdmin(admin.ModelAdmin):
    list_display = ['user_profile', 'value', 'reason', 'timestamp']
    search_fields = ['user_profile__user__username', 'reason']
    list_filter = ['reason']

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['user_profile', 'message', 'timestamp', 'read', 'sender_profile', 'following', 'answer']
    search_fields = ['user_profile__user__username', 'message']
    list_filter = ['read', 'following']
