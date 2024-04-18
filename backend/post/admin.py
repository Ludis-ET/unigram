from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Tag, Post, PostImage, Comment, CommentImage

class PostImageInline(admin.TabularInline):
    model = PostImage
    readonly_fields = ('image_preview',)  
    fields = ('image_preview', 'images',)  
    extra = 0  

    def image_preview(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url=obj.images.url,
            width=100,  
            height=100,  
        ))

    image_preview.short_description = 'Image Preview'

class CommentImageInline(admin.TabularInline):
    model = CommentImage
    readonly_fields = ('image_preview',)  
    fields = ('image_preview', 'comment_image',)  
    extra = 0  

    def image_preview(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url=obj.comment_image.url,
            width=100,  
            height=100,  
        ))

    image_preview.short_description = 'Image Preview'

class OwnerFilter(admin.SimpleListFilter):
    title = 'Owner'
    parameter_name = 'owner'

    def lookups(self, request, model_admin):
        owners = set([post.owner for post in model_admin.get_queryset(request)])
        return [(owner.id, owner.user.username) for owner in owners]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(owner__id=self.value())

class AuthorFilter(admin.SimpleListFilter):
    title = 'Author'
    parameter_name = 'author'

    def lookups(self, request, model_admin):
        authors = set([comment.author for comment in model_admin.get_queryset(request)])
        return [(author.id, author.user.username) for author in authors]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(author__id=self.value())

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'added_time', 'updated_time')
    list_filter = ('added_time', 'updated_time', OwnerFilter)
    search_fields = ('name', 'owner__user__username')
    inlines = (PostImageInline,)
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'author', 'created_at')
    list_filter = ('created_at', AuthorFilter)
    search_fields = ('post__name', 'author__user__username')
    inlines = (CommentImageInline,)
