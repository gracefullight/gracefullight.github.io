---
title: Pythonic - 핸들링
authors: me
tags:
  - python
date: 2020-01-27 18:38:10
---

## Handling

### 파일

- File pointer 여는 법은 `f.open(‘test.txt’, ‘w’)`
- 이 경우 f.write 후에 f.close 해줘야한다.
- `with` 사용시 close 를 생각하지 않아도 된다.
- `with` 구문에서 선언된 변수는 바깥에서 사용가능
- `f.seek(5)` 처럼 위치로 이동 가능하다.
- `string.Template` 과 함께 뷰 파일에서 사용할 수 있다.

```py
## 예시 1
with open('test.txt', 'w') as f:
    f.write('Test')

## 예시 2
with open('test.txt', 'r') as f:
    # print(f.read())
    while True:
        chunk = 2
        line = f.read(chunk)
        print(line)

        if not line:
        reak

## 예시 3
## w+ 로 열면 파일이 초기화 됨
with open('test.txt', 'w+') as f:
    f.write(s)
    # 쓰기 후에 읽기위해 0번째로 이동
    f.seek(0)
    print(f.read())

## 예시 4
import string

with open('view/mail.tpl', 'r') as f:
    t = string.Template(f.read())

## $name, $contents
contents = t.substitute(name='gracefullight', contents='Thanks')
print(contents)
```

#### 파일 확인

- `os.path.exsists`
- `os.path.isfile`
- `os.path.isdir`

#### 파일 제어

- `os.rename`
- `os.symlink`: 심볼릭
- `shutil.copy`: 복사
- `pathlib.Path('TouchFilePath').touch()`: 터치 파일

#### 폴더 제어

- `os.mkdir`
- `os.rmdir`: 빈 디렉토리만 가능
- `shutil.retree`: recursive

#### CSV

- `csv.DictWriter`
- `csv.DictReader`

#### 임시파일

```py
import tempfile

## 삭제 됨
with tempfile.TemporaryFile(mode='w+') as t:
    t.write('hello')

## 삭제 안 됨
with tempfile.NamedTemporaryFile(delete=False) as t:
    # print(t.name)
    with open(t.name, 'w+') as f:
        f.write('hello')


## 삭제되는 디렉토리
with tempfile.TemporaryDirectory() as td:
    print(td)

## 삭제 안 되는 디렉토리
temp_dir = tempfile.mkdtemp()
```

### 압축

#### tar

```py
import tarfile

with tarfile.open('test.tar.gz', 'w:gz') as tr:
    tr.add('dir')

with tarfile.open('test.tar.gz', 'r:gz') as tr:
    tr.extractall(path='dir')

    with tr.extractfile('tarball') as f:
        print(f.read())
```

#### zip

```py
import zipfile

with zipfile.ZipFile('test.zip', 'w') as z:
    # 하나의 폴더만 가능
    z.write('dir')

    # 하위 전체 압축
    for f in glob.glob('dir/**', recursive=True):
        z.write(f)
```

#### ini

- `configparser.ConfigParser()`

#### yaml

- `pip install pyyaml`

### 로깅

- logging.critical
- error
- warning
- info
- debug

```py
import logging

## basicConfig 에 format 을 정의 가능
## doc 확인
logging.basicConfig(filename='test.log', level=logging.INFO)
logging.info('info %s %s', 'test', 'test2') # === logging.info('info {}'.format('test')

## 해당 파일에서 로그명 재정의
logger = logging.getLogger(__name__)

## 로그 레벨 재정의
logger.setLevel(logging.DEBUG)

## 전체 설정 변경
logging.config.fileConfig(...)
logging.config.dictConfig(...)
```

#### 로깅 핸들러

여러 핸들러를 쉽게 붙힐 수 있다. [문서](https://docs.python.org/ko/3/library/logging.handlers.html)

- `handler = logging.FileHandler(...)`
- `logger.addHandler(handler)`

#### 로깅 필터

로그의 출력을 필터를 사용해 쉽게 가공 가능하다. [문서](https://docs.python.org/ko/3/howto/logging-cookbook.html)

### 메일

- `smtplib.SMTP` 와 `from email import message` 패키지로 가능하다.
- 파일 첨부는 email.mime 의 multipart와 text 패키지로 가능하다.
  - 파일 추가 시에는 헤더를 `Content-Disposition: attachment`로 줘야한다.
- `logger.handelrs.SMTPHandler` 로 메일로 로그를 받을 수 있다.

## 쉘

### 서브프로세스

```py
import subprocess

subprocess.run(['ls', '-al'])
```

### 커맨드 체이닝

여러 커맨드를 한 번에 실행시킬 경우 인젝션 방어를 위해 다음과 같이 처리하는 것이 좋다.

```py
process1 = subprocess.Popen(['ls', '-al'], stdout=subprocess.PIPE)
process2 = subprocess.Popen(['grep' , 'test'], stdin=p1.stdout, stdout=subprocess.PIPE)
process1.stdout.close()

output = process2.communicate()[0]
```

### 커맨드 파싱

[argparse](https://docs.python.org/ko/3/library/argparse.html)를 사용하자.

## 날짜

> 파이썬에는 날짜를 timestamp 로 변환해 출력하는 기능은 없다.

### 초기화

```py
import datetime
import time


now = datetime.datetime.now()
print(now)
print(now.isoformat())
print(now.strftime('%Y-%m-%d %H:%M:%S.%f'))

## 날짜만
today = datetime.date.today()
print(today) # 2020-02-02
print(today.isoformat()) # 2020-02-02
print(today.strftime('%Y-%m-%d'))

## 시간만
t = datetime.time(hour=1, minute=10, second=5, microsecond=100)
print(t) # 01:10:05.000100
print(t.isoformat()) # 01:10:05.000100
print(t.strftime('%H:%M:%S')) # 01:10:05

## timestamp
print(time.time()) # 1580617313.843047
```

### 연산

```py
now = datetime.datetime.now()
print(now)

d = datetime.timedelta(weeks=1)
print(now - d)
```
