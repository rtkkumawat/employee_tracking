const ip = require("ip");

module.exports = {
    addIp : async (req,res) => {
        const empIp = await ip.address()
        return empIp
}
}