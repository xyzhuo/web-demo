import requests
import json
# import cx_Oracle
import datetime
import threading
def getTyphoonData():
    url = "http://typhoon.zjwater.gov.cn/Api/TyphoonInfo/201911?callback=jQuery1830020370286197575638_1566524188610&_=1566524188868"
 
    req_header = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
        "Referer": "http://typhoon.zjwater.gov.cn/default.aspx"
    }
    r = requests.get(url, headers=req_header)
    content_str = r.text[44:-3]
    content_json = json.loads(content_str)  # 将字符串转为json对象
    # print(content_json)
    centerlat = content_json["centerlat"]
    centerlng = content_json["centerlng"]
    # 将日期字符串转为日期格式
    endtime = datetime.datetime.strptime(content_json["endtime"], '%Y/%m/%d %H:%M:%S')
    name = content_json["name"]
    print(name)

    for i, point in enumerate(content_json["points"]):
        print(point)
        print("===========================================================================================")

    # # conn = cx_Oracle.connect('gis/123@localhost/orcl')
    # #print("已连接数据库")
    # curs = conn.cursor()
    # sql_del = "delete from typhoon"
    # curs.execute(sql_del)
    # conn.commit()
    # # enumerate() 函数用于将一个可遍历的数据对象(如列表、元组或字符串)组合为一个索引序列，同时列出数据和数据下标，一般用在 for 循环当中
    # for i, point in enumerate(content_json["points"]):
    #     uuid = i + 1
    #     lat = point["lat"]  # 纬度
    #     lng = point["lng"]  # 经度
    #     movedirection = point["movedirection"]  # 移向
    #     movespeed = point["movespeed"]  # 移速
    #     power = point["power"]  # 风力值
    #     pressure = point["pressure"]  # 中心气压
    #     speed = point["speed"]  # 风速
    #     strong = point["strong"]  # 风力文本
    #     time = datetime.datetime.strptime(point["time"], '%Y/%m/%d %H:%M:%S')  # 时间
    #     # 使用 cursor() 方法创建一个游标对象 cursor
    #     sql_insert = "insert into typhoon (uuid,centerlat,centerlng,endtime,name,lng,lat,movedirection,movespeed,power,pressure,speed,strong，time) values(:uuid,:centerlat,:centerlng,:endtime,:name,:lng,:lat,:movedirection,:movespeed,:power,:pressure,:speed,:strong,:time)"
    #     curs.prepare(sql_insert)
    #     rown = curs.execute(None, {'uuid': uuid, 'centerlat': centerlat, 'centerlng': centerlng, 'endtime': endtime,
    #                                'name': name, 'lng': lng, 'lat': lat, 'movedirection': movedirection,
    #                                'movespeed': movespeed, 'power': power, 'pressure': pressure, 'speed': speed,
    #                                'strong': strong, 'time': time})
    #     conn.commit()
    # print("数据插入成功")
    # print('TimeNow:%s' % (datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    # timer = threading.Timer(10, getTyphoonData)
    # timer.start()
 
 
if __name__ == "__main__":
    getTyphoonData()