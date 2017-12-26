# Qbao STF api接口库
> 实现了STF API中所有提供接口的调用，使用swagger-client调用
> 为STF、Appium的自动化结合做准备

## 获取所有设备列表
```
function getDevices(client)
```

## 按串号获取用户设备
```
function getDeviceBySerial(client, serial)
```

## 获取用户信息
```
function getUser(client)
```

##获取用户设备列表
```
function getUserDevices(client)
```

## 按串号获取用户占用设备
```
function getUserDeviceBySerial(client, serial)
```

## 按串号释放用户设备
```
function deleteUserDeviceBySerial(client, serial)
```

## 按串号获取设备链接地址
```
function remoteConnectUserDeviceBySerial(client, serial)
```

## 按串号释放设备链接地址
```
function remoteDisconnectUserDeviceBySerial(client, serial)
```

## 获取用户AT
```
function getUserAccessTokens(client, )
```

##
按串号用户占用设备
```
function addUserDevice(client, serial)
```

## 链接设备
```
function connectDevices(client, serial)
```

