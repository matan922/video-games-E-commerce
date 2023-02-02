from rest_framework.response import Response

# Create your views here.

# ------------------ Home Page --------------------

def index():
    return Response("hello world")