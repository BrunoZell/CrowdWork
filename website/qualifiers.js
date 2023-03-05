
$(".project-title").click(function() {
    console.log("connect clicked");
    window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          "http://35.212.230.225:8080/": {}
        },
    });
});



$(".c-button-m").click(function() {
    console.log("publish project");

    const promise1 = window.ethereum.request({
        "method": "wallet_invokeSnap",
        "params": {
            "snapId": "http://35.212.230.225:8080/",
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
