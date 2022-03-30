from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer
  
# Create your views here.
@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        'List': '/item-list/',
        'Detail View': '/item-detail/<str:pk>/',
        'Create': '/item-create/',
        'Update': '/item-update/<str:pk>/',
        'Delete': '/item-delete/<str:pk>/',
    }
    return Response(api_urls)

@api_view(['POST'])
def  add_items(request):
    item = ItemSerializer(data=request.data)
    # if Item.objects.filter(**request.data).exists():
    #     return Response({'message': 'Item already exists'}, status=400)
    if item.is_valid():
        item.save()
        return Response(item.data)
    else :
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def view_items(request):
    if request.method == 'GET':
        items = Item.objects.all()
        serializer = ItemSerializer(items, many =True)
        return Response(serializer.data)


@api_view(['PATCH'])
def update_items(request, pk):
    item = Item.objects.get(pk=pk)
    data = ItemSerializer(instance=item, data=request.data)
  
    if data.is_valid():
        data.save()
        return Response(data.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

@api_view(['DELETE'])
def delete_items(request, pk):
    item = get_object_or_404(Item, pk=pk)
    item.delete()
    return Response(status=status.HTTP_202_ACCEPTED)
  
    
    