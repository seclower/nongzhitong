# 创建一个简单的HTTP服务器
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8080/')
$listener.Start()

Write-Host "服务器已启动，访问地址: http://localhost:8080/"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    # 处理请求路径
    $path = $request.Url.LocalPath
    if ($path -eq '/') {
        $path = '/user/index.html'
    }

    # 构建文件路径
    $filePath = Join-Path -Path $PWD -ChildPath $path.Substring(1)

    # 检查文件是否存在
    if (Test-Path $filePath -PathType Leaf) {
        # 读取文件内容
        $content = Get-Content -Path $filePath -Raw

        # 设置响应头
        $response.ContentType = switch ([System.IO.Path]::GetExtension($filePath)) {
            '.html' { 'text/html' }
            '.js' { 'text/javascript' }
            '.css' { 'text/css' }
            '.json' { 'application/json' }
            '.png' { 'image/png' }
            '.jpg' { 'image/jpeg' }
            '.gif' { 'image/gif' }
            default { 'application/octet-stream' }
        }

        # 写入响应内容
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    } else {
        # 文件不存在，返回404
        $response.StatusCode = 404
        $content = '<html><body><h1>404 Not Found</h1></body></html>'
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    }

    # 关闭响应
    $response.Close()
}

# 停止服务器
$listener.Stop()
$listener.Close()