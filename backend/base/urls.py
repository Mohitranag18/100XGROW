from django.urls import path
from .views import get_notes, CustomTokenObtainPairView, CustomRefreshTokenView, logout, is_authenticated, register
from django.conf.urls.static import static
from django.conf import settings
from .views import get_user_profile_data, get_my_user_data, update_my_user_data, user_complete_data_view

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('notes/', get_notes, name='get_notes'),  # GET method for fetching notes
    path('logout/', logout, name='logout'),  # POST method for logging out
    path('authenticated/', is_authenticated, name='is_authenticated'),  # POST method to check if authenticated
    path('register/', register, name='register'),  # POST method for registration
    path('user_data/', get_user_profile_data, name='get_user_profile_data'),  # GET method for fetching user data
    path('my_user_data/', get_my_user_data, name='get_my_user_data'),
    path('my_user_data/update/', update_my_user_data, name='update_my_user_data'),
    path('user-complete-data/', user_complete_data_view, name='user-complete-data'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
