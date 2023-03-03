$env:CL_KEYSTORE="./sc-key.p12"
$env:CL_KEYALIAS="alias"
$env:CL_PASSWORD="password"
java -jar cl-keytool.jar generate
sbt "stateChannel/run"