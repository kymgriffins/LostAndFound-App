from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework import generics
# Create your views here.
from rest_framework import status

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    # permission_classes = (AllowAny)
    serializer_class = RegisterSerializer
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

#Define a function to handle POSTing Items

@api_view(['GET', 'POST'])
def post_item(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        items = Item.objects.all()
        serializer = ItemSerializer(items, many =True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def claim_items(self,request, id=None):
    item = Item.objects.get(id=id)
    serializer = ItemSerializer(item, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
