from rest_framework import permissions

class InternalOnlyPermission(permissions.BasePermission):
    """
    Restrict access to internal IPs or calls from other Django app (via custom header).
    """
    ALLOWED_IPS = ['127.0.0.1', '192.168.1.100']  # Add your internal IPs; load from settings/env in production

    def has_permission(self, request, view):
        # Check IP
        ip_addr = request.META.get('REMOTE_ADDR')
        if ip_addr in self.ALLOWED_IPS:
            return True
        
        # Optional: Check for header from other Django app (e.g., set a secret in requests)
        if request.headers.get('X-Internal-App-Key') == 'your-secret-key':  # Load secret from settings/env
            return True
        
        return False