---
title: "Ubuntu에서 timezone 변경"
authors: me
tags: [timezone, linux]
date: 2017-02-15 01:46:18
---

Ubuntu 설치시 다른 국가로 되어있는 시간대를 바꿔야한다.

# 실행

```bash
$ tzselect
```

명령어를 실행하면 아래처럼 번호를 선택할 수 있다.

```bash
Please identify a location so that time zone rules can be set correctly.
Please select a continent, ocean, "coord", or "TZ".
 1) Africa
 2) Americas
 3) Antarctica
 4) Asia
 5) Atlantic Ocean
 6) Australia
 7) Europe
 8) Indian Ocean
 9) Pacific Ocean
10) coord - I want to use geographical coordinates.
11) TZ - I want to specify the time zone using the Posix TZ format.
#? 4
```

4번 아시아를 선택하면 국가 선택지가 나온다.

```bash
Please select a country whose clocks agree with yours.
 1) Afghanistan           18) Israel                35) Palestine
 2) Armenia               19) Japan                 36) Philippines
 3) Azerbaijan            20) Jordan                37) Qatar
 4) Bahrain               21) Kazakhstan            38) Russia
 5) Bangladesh            22) Korea (North)         39) Saudi Arabia
 6) Bhutan                23) Korea (South)         40) Singapore
 7) Brunei                24) Kuwait                41) Sri Lanka
 8) Cambodia              25) Kyrgyzstan            42) Syria
 9) China                 26) Laos                  43) Taiwan
10) Cyprus                27) Lebanon               44) Tajikistan
11) East Timor            28) Macau                 45) Thailand
12) Georgia               29) Malaysia              46) Turkmenistan
13) Hong Kong             30) Mongolia              47) United Arab Emirates
14) India                 31) Myanmar (Burma)       48) Uzbekistan
15) Indonesia             32) Nepal                 49) Vietnam
16) Iran                  33) Oman                  50) Yemen
17) Iraq                  34) Pakistan
#? 23
```

국가를 선택 후 마지막으로 확인을 해주면

```bash
The following information has been given:

        Korea (South)

Therefore TZ=\'Asia/Seoul\' will be used.
Local time is now:      Tue Feb 14 23:04:10 KST 2017.
Universal Time is now:  Tue Feb 14 14:04:10 UTC 2017.
Is the above information OK?
1) Yes
2) No
#? 1

...
Here is that TZ value again, this time on standard output so that you
can use the /usr/bin/tzselect command in shell scripts:
Asia/Seoul
```

성공적으로 반영되었다.

# 확인

```bash
$ date
Tue Feb 14 23:04:21 KST 2017
```
