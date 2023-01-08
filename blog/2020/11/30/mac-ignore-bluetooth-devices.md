---
title: 맥에서 블루투스 장치 차단하기
authors: me
tags: [mac, bluetooth]
date: 2020-11-30 00:37:23

---

# 블루투스 차단

블루투스 기기가 자동 연동될 때 쉘에서 직접 차단을 할 수 있다.

## 맥 어드레스 확인

`option + shift` 후에 블루투스 상태창을 클릭하면 MAC 주소(Media Access Control Address)를 알 수 있다.

## 주소 차단

블루투스 정보는 `com.apple.Bluetooth.plist` 에서 관리한다.

``` bash
# 설정파일을 xml 형식으로 변환한다.
sudo plutil -convert xml1 /Library/Preferences/com.apple.Bluetooth.plist

# 변환한 파일을 열어 아래 라인에 맥 어드레스를 추가한다.
sudo vi /Library/Preferences/com.apple.Bluetooth.plist
2794         <key>IgnoredDevices</key>
2795         <array>
2796                 <string>47-02-87-10-0f-34</string>
2797                 <string>74-3a-4e-e3-5d-68</string>
2798         </array>

# 다시 바이너리로 바꾼다.
sudo plutil -convert binary1 /Library/Preferences/com.apple.Bluetooth.plist
```

이제 더 이상 모르는 기기로부터의 연결을 요청받지 않아도 된다.

# 참조

빅서로 업데이트 후부터 알 수 없는 맥 어드레스의 기기가 자동 연결되면서 매직 키보드와 트랙패드의 연결이 유실되는 현상이 있어서 무시하는 법을 찾기 시작하였는데, 비슷한 버그가 발생하는 것 같다.

- [Big Sur Bluetooth automatically connects](https://discussions.apple.com/thread/252053214)