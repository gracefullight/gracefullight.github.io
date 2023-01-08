---
title: java localhost HTTPS Connection
authors: me
tags: [java]
date: 2017-01-10 22:17:49
---

localhost 에서 Https 페이지로 httpcon 을 열면 오류가 발생한다.
인증을 받아야하기 때문인데 함수하나만 호출하면 연결이 가능해진다.

# 소스

```java
private void setTrustAllCerts() throws Exception{
    TrustManager[] trustAllCerts = new TrustManager[]{
        new X509TrustManager() {
            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                return null;
            }
            public void checkClientTrusted( java.security.cert.X509Certificate[] certs, String authType ) {}
            public void checkServerTrusted( java.security.cert.X509Certificate[] certs, String authType ) {}
        }
    };

    // Install the all-trusting trust manager
    try {
        SSLContext sc = SSLContext.getInstance( "SSL" );
        sc.init( null, trustAllCerts, new java.security.SecureRandom() );
        HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
        HttpsURLConnection.setDefaultHostnameVerifier(
            new HostnameVerifier() {
                public boolean verify(String urlHostName, SSLSession session) {
                    return true;
                }
            });
    }
    catch (Exception e) {
        //We can not recover from this exception.
        e.printStackTrace();
    }
}
```

[원본](https://stackoverflow.com/questions/373518/how-do-i-use-a-local-https-url-in-java)에서 가져왔다.

# 예제

HTTPCON 전에 호출하면 인증서 없이 HTTPS 연결이 가능하다.
