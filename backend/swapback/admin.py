from django.contrib import admin
from .models import User, Item, Like, Comment, Interest, Chat, Message
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ('id', 'username', 'email', 'bio', 'avatar_url', 'date_joined')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('bio', 'avatar_url')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Additional Info', {'fields': ('bio', 'avatar_url')}),
    )
    ordering = ('-date_joined',)


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'status', 'user', 'image_preview')
    search_fields = ('title', 'description', 'user__username')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="100" height="100" style="object-fit: cover;" />'
        return "(No image)"
    image_preview.allow_tags = True
    image_preview.short_description = 'Image Preview'
    
@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'item', 'created_at')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'item', 'content', 'created_at')
    search_fields = ('content',)

@admin.register(Interest)
class InterestAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'item', 'created_at')

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('id', 'user1', 'user2', 'item', 'created_at')

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'chat', 'sender', 'content', 'created_at')
    search_fields = ('content',)
