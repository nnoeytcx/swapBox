from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path


from rest_framework_simplejwt.views import (
 TokenObtainPairView,
 TokenRefreshView,
)
 
 
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'items', ItemViewSet)
router.register(r'likes', LikeViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'chats', ChatViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'interests', InterestViewSet)
router.register(r'user-items', UserItemsViewSet, basename='user-items')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user, name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('upload-item/', upload_item),
    path('items/<int:item_id>/like/', like_item),
    path('items/<int:item_id>/unlike/', unlike_item),
    path('items/<int:item_id>/comments/', CommentListCreateView.as_view(), name='item-comments'),
    path('api/items/<int:item_id>/comments/', post_comment),
]
