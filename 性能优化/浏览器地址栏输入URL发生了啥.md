# 浏览器地址栏输入URL到渲染的过程

首先我们需要通过 DNS（域名解析系统）将 URL 解析为对应的 IP 地址，
然后与这个 IP 地址确定的那台服务器建立起 TCP 网络连接，
随后我们向服务端抛出我们的 HTTP 请求，
服务端处理完我们的请求之后，
把目标数据放在 HTTP 响应里返回给客户端，
拿到响应数据的浏览器就可以开始走一个渲染的流程。
渲染完毕，页面便呈现给了用户，并时刻等待响应用户的操作。

我们将这个过程切分为如下的过程片段：

1. DNS 解析
2. TCP 连接
3. HTTP 请求抛出
4. 服务端处理请求，HTTP 响应返回
5. 浏览器拿到响应数据，解析响应内容，把解析的结果展示给用户

[性能优化](./性能优化.jpg)
