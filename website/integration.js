
$(".connect").click(function() {
    console.log("connect clicked");
    window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          "local:http://localhost:8080": {}
        },
    });
});



$(".shipit").click(function() {
    console.log("publish project");

    const promise1 = window.ethereum.request({
        "method": "wallet_invokeSnap",
        "params": {
            "snapId": "local:http://localhost:8080",
            "request": {
                "method": "publish"
            }
        }
	});

    promise1.then((value) => {
        console.log("dialog done. Result:");
        console.log(value);
        window.location.href = "" // url to chatroom
      });
});


$(".acceptx").click(function() {
    console.log("accept 1 clicked");
    const promise1 = window.ethereum.request({
        "method": "wallet_invokeSnap",
        "params": {
            "snapId": "local:http://localhost:8080",
            "request": {
                "method": "accept"
            }
        }
	});
});

$(".accept-last").click(function() {
    console.log("accept 1 clicked");
    const promise1 = window.ethereum.request({
        "method": "wallet_invokeSnap",
        "params": {
            "snapId": "local:http://localhost:8080",
            "request": {
                "method": "accept"
            }
        }
	});

    promise1.then((value) => {
        console.log("last accept done. Result:");
        console.log(value);
        window.location.href = "" // url to investor page
      });
});
