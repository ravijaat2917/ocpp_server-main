const { RPCClient } = require('ocpp-rpc');





const cli = new RPCClient({
    endpoint: 'ws://ec2-3-111-82-158.ap-south-1.compute.amazonaws.com:8000',//ocpp url 
    identity: 'EWUPGHRPPS001',             // the OCPP identity
    protocols: ['ocpp1.6'],          // client understands ocpp1.6 subprotocol
    strictMode: true,                // enable strict validation of requests & responses
});

(async function main () {
    // You can use await inside this function block
    await cli.connect();

    // send a BootNotification request and await the response
    const bootResponse = await cli.call('BootNotification', {
        chargePointVendor: "ocpp-rpc",
        chargePointModel: "ocpp-rpc",
    });
    
    // check that the server accepted the client
    if (bootResponse.status === 'Accepted') {
    
        // send a Heartbeat request and await the response
        const heartbeatResponse = await cli.call('Heartbeat', {});
        // read the current server time from the response
        console.log('Server time is:', heartbeatResponse.currentTime);
    
        // send a StatusNotification request for the controller
        await cli.call('StatusNotification', {
            connectorId: 0,
            errorCode: "NoError",
            status: "Available",
        });
    }
    

})();
// connect to the OCPP server
