import json
from django.http.response import HttpResponse
from django.shortcuts import render

# Create your views here.


def home(request):
    return render(request, "index.html")


def getbuildnumber(request):
    data = {"build_nums": ['1.0.0', '1.1.0', '1.2.0', '1.3.4']}
    return HttpResponse(json.dumps(data))


def getgraphdata(request):
    build_num = json.loads(request.body.decode()).get('buildnum')
    print(build_num)
    if build_num == "1.1.0":
        data = {"affected_rate": [10, 20, 45, 60]}
    elif build_num == "1.2.0":
        data = {"affected_rate": [50, 70]}
    else:
        data = {"affected_rate": [30, 70, 67, 88, 89]}
    return HttpResponse(json.dumps(data))
