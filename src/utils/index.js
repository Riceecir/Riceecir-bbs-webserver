const os = require('os')

const getLocalIp = () => {
    const faces = os.networkInterfaces()
    const interFaces = faces['以太网'] || faces['network'] || []
    interFaces.forEach(item => {
        let ip = null
        if (item.family.toLocaleLowerCase() === 'ipv4' && item.address !== '127.0.0.1') {
            ip = item.address
        }
    })

    return ip
}

module.exports = {
  getLocalIp
}