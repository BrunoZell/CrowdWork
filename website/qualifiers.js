
$(".project-title").click(function() {
    console.log("connect clicked");
    window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          "local:http://localhost:8080/": {}
        },
    });
});



$(".c-button-m").click(function() {
    console.log("publish project");

    const promise1 = window.ethereum.request({
        "method": "wallet_invokeSnap",
        "params": {
            "snapId": "local:http://localhost:8080/",
            "request": {
                "method": "publish"
            }
        }
	});

    promise1.then((value) => {
        console.log("dialog done. Result:");
        console.log(value);
        window.location.href = "https://crowdwork.webflow.io/chatroom" // url to chatroom
      });
});
