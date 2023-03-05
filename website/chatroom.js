
// <script>

$(".connect2").click(function() {
    console.log("connect clicked");
    window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          "http://35.212.230.225:8080/": {}
        },
    });
});



$(".accept").click(function() {
    console.log("accept clicked");
    const promise1 = window.ethereum.request({
        "method": "wallet_invokeSnap",
        "params": {
            "snapId": "http://35.212.230.225:8080/",
            "request": {
                "method": "accept"
            }
        }
	});
});

$(".accept-last").click(function() {
    console.log("last accept clicked");
    const promise1 = window.ethereum.request({
        "method": "wallet_invokeSnap",
        "params": {
            "snapId": "http://35.212.230.225:8080/",
            "request": {
                "method": "accept"
            }
        }
	});

    promise1.then((value) => {
        console.log("last accept done. Result:");
        console.log(value);
        window.location.href = "https://crowdwork.webflow.io/investors" // url to investor page
      });
});

//</script>
