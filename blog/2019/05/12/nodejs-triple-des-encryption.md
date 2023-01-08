---
title: nodejs triple des 암호화
authors: me
tags: [nodejs, javascript, crypto]
date: 2019-05-12 20:29:20

---

triple des 알고리즘으로 암호화하는 일은 요새는 드문데, 드물어서 그런지 구글링해도 아무 것도 나오지 않았다.

레거시 언어들에는 **3des** 암호화된 로직이 많은데, 포팅하면서 개발해야될 필요성이 생겼다.

# 암호화

- nodejs 의 암호화 패키지는 crypto 안에 들어있다.
- `crypto.getCiphers();` 메소드로 사용할 수 있는 알고리즘을 확인할 수 있다.
  - `ciphers.filter(cipher => cipher.includes('des'));`
- 3des 알고리즘은 `des-ede3` 로 시작한다.
- 키는 24bytes 이며, iv 는 8bytes 다.

# 소스

```js
const crypto = require('crypto');

class TripleDes()
{
  // #iv;
  // #key;

  constructor(key, iv) {
    this.key = key;
    this.iv = iv;
  }

  getKey() {
    return this.key.padEnd(24, String.fromCharCode(0));
  }

  getIv() {
    return this.iv;
  }

  encrypt(plain, iv) {
    if (!iv) {
      iv = this.iv ? Buffer.from(this.iv, "hex") : crypto.randomBytes(8);
    }

    const cipher3des = crypto.createCipheriv("des-ede3-cfb8", this.getKey(), iv);
    let encrypted = cipher3des.update(plain, "utf8", "hex");
    encrypted += cipher3des.final("hex");

    this.iv = iv.toString("hex");
    return encrypted;
  }

  decrypt(encrypted, iv) {
    if (!iv) {
      iv = this.iv;
    }

    const decipher3des = crypto.createDecipheriv("des-ede3-cfb8", this.getKey(), Buffer.from(iv, "hex"));
    let decrypted = decipher3des.update(encrypted, "hex", "utf8");
    decrypted += decipher3des.final("utf8");

    return decrypted;
  }
}

module.exports = TripleDes;
```

위의 `encrypt` 메소드는 아래처럼 버퍼를 합친 후에 헥스로 바꾸는 것과 동일하다.

```js
let encrypted = Buffer.concat([
  cipher3des.update(plain, 'utf8'),
  cipher3des.final('utf8'),
]);

encrypted = encrypted.toString('hex');
```

# 사용법

```js
const TripleDes = require('./TripleDes');

const tripleDes = new TripleDes('encryptionKey');
// 암호화
const encrypted = tripleDes.encrypt('yummy');
// 복호화
const decrypted = tripleDes.decrypt(encrypted);
```

# 참조

- [nodejs.crypto](https://nodejs.org/api/crypto.html)
