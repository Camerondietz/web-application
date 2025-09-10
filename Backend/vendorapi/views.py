import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny  # Not used; we use custom
from .permissions import InternalOnlyPermission
from .functions import get_prices_for_parts, get_product_details

logger = logging.getLogger(__name__)

class PricesView(APIView):
    permission_classes = [InternalOnlyPermission]

    def get(self, request, *args, **kwargs):
        product_ids_str = request.query_params.get('product_ids', '')
        if not product_ids_str:
            logger.error("Missing product_ids parameter.")
            return Response({'status': 'error', 'message': 'Missing product_ids'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product_ids = [int(pid) for pid in product_ids_str.split(',')]
        except ValueError:
            logger.error("Invalid product_ids format.")
            return Response({'status': 'error', 'message': 'Invalid product_ids format'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            data = get_prices_for_parts(product_ids)
            logger.info(f"Fetched prices for product IDs: {product_ids}")
            return Response({'status': 'success', 'data': data}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Unexpected error in PricesView: {str(e)}")
            return Response({'status': 'error', 'message': 'Failed to fetch prices'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProductDetailsView(APIView):
    permission_classes = [InternalOnlyPermission]

    def get(self, request, *args, **kwargs):
        product_id = request.query_params.get('product_id')
        if not product_id:
            logger.error("Missing product_id parameter.")
            return Response({'status': 'error', 'message': 'Missing product_id'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product_id = int(product_id)
        except ValueError:
            logger.error("Invalid product_id format.")
            return Response({'status': 'error', 'message': 'Invalid product_id'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            data = get_product_details(product_id)
            if not data:
                return Response({'status': 'error', 'message': 'No details found'}, status=status.HTTP_404_NOT_FOUND)
            logger.info(f"Fetched details for product ID: {product_id}")
            return Response({'status': 'success', 'data': data}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Unexpected error in ProductDetailsView: {str(e)}")
            return Response({'status': 'error', 'message': 'Failed to fetch details'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)