var Swagger = require('swagger-client');
var STF_URL = 'http://192.168.82.43:7100/api/v1/swagger.json';
var token = '77a914eef7a842c0a940f092385d1d6cca9d8fb4c5da4308b9bf1238efca3f01';

var stf = new Swagger(STF_URL,{
    authorizations: {
        accessTokenAuth: 'Bearer ' + token
    }
})

/**
 *获取所有设备列表
 * @param client
 * @returns {Promise.<TResult>|*}
 */
function getDevices(client) {
    return client.then(function (client) {
        return client.apis.devices.getDevices({
            fields: 'serial,present,ready,using,owner'
        })
    })
}

/**
 *按串号获取用户设备
 * @param client
 * @param serial
 * @returns {Promise.<TResult>|*}
 */
function getDeviceBySerial(client, serial) {
    return client.then(function (client) {
        return client.apis.devices.getDeviceBySerial({
            serial: serial
            , fields: 'serial,present,ready,using,owner'
        })
    })
}

/**
 *获取用户信息
 * @param client
 */
function getUser(client) {
    return client.then(function (client) {
        return client.apis.user.getUser()
    })
}

/**
 *获取用户设备列表
 * @param client
 */
function getUserDevices(client) {
    return client.then(function (client) {
        console.log(client)
        return client.apis.user.getUserDevices()
    })
}

/**
 *按串号获取用户占用设备
 * @param client
 * @param serial
 */
function getUserDeviceBySerial(client, serial) {
    return client.then(function (client) {
        return client.apis.user.getUserDeviceBySerial({
            serial: serial
            , fields: 'serial,present,ready,using,owner'
        })
    })
}

/**
 *按串号释放用户设备
 * @param client
 * @param serial
 */
function deleteUserDeviceBySerial(client, serial) {
    return client.then(function (client) {
        return client.apis.user.deleteUserDeviceBySerial({
            serial: serial
        })
    })
}

/**
 * 按串号获取设备链接地址
 * @param client
 * @param serial
 * @returns {Promise.<TResult>|*}
 */
function remoteConnectUserDeviceBySerial(client, serial) {
    return client.then(function (client) {
        return client.apis.user.remoteConnectUserDeviceBySerial({
            serial: serial
        })
    })
}

/**
 * 按串号释放设备链接地址
 * @param client
 * @param serial
 * @returns {Promise.<TResult>|*}
 */
function remoteDisconnectUserDeviceBySerial(client, serial) {
    return client.then(function (client) {
        return client.apis.user.remoteDisconnectUserDeviceBySerial({
            serial: serial
        })
    })
}

/**
 * 获取用户AT
 * @param client
 * @returns {Promise.<TResult>|*}
 */
function getUserAccessTokens(client, ) {
    return client.then(function (client) {
        return client.apis.user.getUserAccessTokens()
    })
}

/**
 * 按串号用户占用设备
 * @param client
 * @param serial
 * @returns {Promise.<TResult>|*}
 */
function addUserDevice(client, serial) {
    return client.then(function (client) {
        return client.apis.user.addUserDevice({
            device: {
                serial: serial
                , timeout: 900000
            }
        })
    })
}

/**
 * 链接设备
 * @param client
 * @param serial
 */
function connectDevices(client, serial) {
    getDeviceBySerial(client, serial)
        .then(function(res) {
            var device = res.obj.device
            console.log(device)
            if(!device.present || !device.ready || device.using || device.owner){
                console.log('Device is not available')
            }
            return addUserDevice(client, serial)
        })
        .then(function(res) {
            console.log(res)
            if (!res.obj.success) {
                console.log('Could not add device')
                return
            }
            return remoteConnectUserDeviceBySerial(client, serial)
        })
        .then(function(res) {
            if(res.success){
                return res.remoteConnectUrl
            }
        })
        .catch(function (error) {
            console.log(error.stack)
        })
}


