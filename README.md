## 프로젝트 설명


### 텍스트로 릴레이 소설을 만들 수 있는 플랫폼!

  -> 누군가 시작한 소설을 함께 완성시켜보세요!

1. ⭐방장이 문단 수 를 정하고 첫번째 문단을 작성 하면 이어서 문장들을 작성해 나갈 수 있어요!
2. 🙅‍♀️ 먼저 작성중인 문단은 끼어들 수 없어요!
3. 🚩 정해진 문단 수가 다 차게 되면 소설은 완성됩니다!!
4. 👍 소설에 평점을 매길 수 있고, 최고의 문장에 좋아요 를 누를 수 있어요!

## 프로젝트 아키텍쳐


![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/88e5dd6e-baf5-4fd3-89ab-33ca9b3dbd09/Untitled.png)

## 프로젝트 타임 라인


[프로젝트 구상 및 설계](https://www.notion.so/67dfbc939fb949c2be8be8971075aee3)

[와이어 프레임을 통한 view 구현](https://www.notion.so/view-87a0cf065e344c1fbc7a3e1dba51d76d)

[게시물 CRUD 구현](https://www.notion.so/CRUD-a6577b88432d4d599885f84268b2df70)

[댓글, 문단 CRUD 구현](https://www.notion.so/CRUD-ff41c9de8abb43cc94b18a40e87e5a9a)

[디자인 구현](https://www.notion.so/627fb6d1bcd74087ad508919319b74d8)

[Socket 연결 및 구독 / 데이터 전송 구현](https://www.notion.so/Socket-946f6ba7c35f4dd383bedd9d9aa4dfef)

## 완성 페이지


[We-Write](https://www.wewrite.co.kr/)

### Frontend Git : https://github.com/peppermintt0504/Project

### Backend Git  : https://github.com/binscot/HanghaeFinal

1. 데모 영상


# 1. 기능 설명


> 1. 로그인 페이지

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c46b4594-e2ce-4ec0-a31a-54a2066837dd/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/88c7641f-527c-40eb-ada8-45ad56eb74cc/Untitled.png)

- 기능
    - Input을 이용하여 email과 password를 입력 받아 로그인 API에 전송
    - 로그인을 시도하여 성공하면 메인페이지로 이동
    - 로그인이 실패할 경우 오른쪽과 같이 input box에 경고를 준다.
---

> 2.회원가입
1. 페이지 화면

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/09751352-f728-4ff1-a4f8-d6d68c48ac1e/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0cb33431-455c-4397-aab7-dbb0a63c3db4/Untitled.png)

1. 기능
- input을 통하여 데이터 입력
- 이메일 중복체크, 이메일 형식 체크, 이메일 인증 코드 보내기, 인증번호 확인
    - 이메일 중복 체크 : API에 이메일 데이터를 전송하여 중복 여부 확인(추가하세요)
    - 이메일 형식 체크 : 정규식을 이용하여 이메일 형식을 체크
    - 이메일 인증 코드 전송 및 확인 : API 통신을 이용하여 인증 코드 전송과 입력한 인증 코드 일치 여부 확인
- 닉네임 중복 체크
    - 디바운스를 이용하여 최소의 검증으로 닉네임 중복 체크
- 비밀번호 형식 체크와 비밀번호 확인 체크
    - 디바운스와 정규식을 통하여 비밀번호 형식 일치 여부를 실시간으로 사용자에게 띄워준다.
    - 비밀번호 확인란의 데이터도 위와 같이 비밀번호에 입력된 데이터와 일치 여부를 띄워준다.

---

> 3. 풋터
> 

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a1f4da9c-d588-4bd6-9ee1-6fbebafdc0da/Untitled.png)

- 메인 : 메인페이지로 이동
- 완결작품 : 완결된 작품 리스트로 이동
- + : 소설 작성페이지로 이동
- 참여가능 : 미완결 작품 리스트로 이동
- 마이페이지 : 내정보 확인

---

> 4. 메인페이지
> 
1. 페이지 화면

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7a894b23-f041-463c-a1fc-12957b3b6032/Untitled.png)

---

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7b064a94-11ef-4e72-bc81-04e674b8e194/Untitled.png)

1. 기능
- Swiper React를 사용하여  메인 페이지 추천 게시물 출력
    - 추천 게시물의 기준은 좋아요가 많은 Top 6 게시물
    - 5초 간격으로 슬라이드가 자동으로 다음 슬라이드로 넘어감
    - 마우스 클릭 / 터치를 통해 슬라이드 이동 가능
- 새로운 이야기
    - 새로 완성된 소설이 진열.
- 당신에게 추천해요
    - 북마크를 가장 많이 받은 게시글의 댓글 확인 가능.
- 당신이 완성해주세요
    - 미완성 작품들 확인 가능.
    - 
- 헤더의 햄버거 아이콘 클릭 시, 카테고리 선택 가능.
    - 슬라이드를 가로로 설정하여 테마를 선택.
    - 테마를 선택하면 해당 테마의 소설이 나온다.
    

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2092940a-2cb2-4883-bd17-3aa913bcc9db/Untitled.png)

- 헤더의 종모양 아이콘 클릭 시 알림창으로 이동
    - 알림의 종류는 총 5가지
        1. 자신이 작성한 소설의 좋아요
        2. 자신이 작성한 소설의 북마크
        3. 자신이 작성한 소설의 문단의 좋아요
        4. 자신이 작성한 소설의 다음 문단이 작성
        5. 자신이 작성한 소설의 완성
        
        ![22.03.30 노션추가용.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b7c11f53-58c1-460a-9f40-cec5583b9626/22.03.30_노션추가용.png)
        
    
    - 공지·이벤트 확인 가능
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9dc0e78a-5df8-4c4f-ac19-2bc7987e9f66/Untitled.png)
        

---

> 5. 완결작품 페이지
> 
1. 페이지 화면

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/952e870b-2bd2-4f74-9693-1bb2a69d4e65/Untitled.png)

1. 기능
    - 최신순 / 좋아요 순으로 리스트 정렬 가능
    - 좋아요 버튼, 북마크 버튼을 클릭 가능.
        - 버튼 클릭 시 시그니처색으로 아이콘 색깔 변경됨.

---

> 6. 게시글 작성 페이지
> 
1. 페이지 화면

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1c137f6b-7511-4a45-80dc-9c0ee7480440/Untitled.png)

1. 기능
    - 표지 변경
        - ‘표지 변경하기’ 버튼 클릭 시 사진 업로드 가능
        - 이미지 업로드를 하지 않을 경우, 기본 이미지가 지정됨.
        - 선택된 이미지 파일은 base64로 인코딩 / 디코딩을 하여 파일 사이즈를 압축하여 DB에 전송한다.
        - 이 때 이미지 파일을 압축한 이유는 고해상도의 사진을 전송할 경우 백엔드에서 정상적으로 이미지 파일을 받을 수 없기 때문이다.
    - 첫 문장 작성하기
        - 소설의 첫 문장을 작성하는 부분이다. input의 onChange를 디바운스 1초로 설정하여 렌더링을 최소화시켰다.
    - 완성 문장 수 설정
        - 이후 참여하는 사람들이 문장을 얼마나 더 쓸 수 있는 지 설정할 수 있음.
    - 카테고리
        - 소설을 생성할 때 하나의 카테고리를 설정할 수 있다. 이 후 소설이 완성될 때 마지막 작성 유저가 추가로 하나의 카테고리를 추가할 수 있다.

---

> 7. 게시글 디테일 페이지
> 
1. 페이지 화면

![GIF 2022-04-01 오후 6-50-44.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d543ec9d-171c-4bd6-8109-3d5f3e443105/GIF_2022-04-01_오후_6-50-44.gif)

                                                                         작성 시작

![GIF 2022-04-01 오후 6-52-58.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/656e2864-a040-4102-b4fc-731884c16b91/GIF_2022-04-01_오후_6-52-58.gif)

                                                       다른 유저가 작성을 시작했을 때

![GIF 2022-04-01 오후 6-53-27.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/023e962c-1574-4e5d-8456-4e5d90c69358/GIF_2022-04-01_오후_6-53-27.gif)

                                                                         작성 완료

![GIF 2022-04-01 오후 6-53-59.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bdb9ca79-8c9a-48d6-be76-cf8e145cb844/GIF_2022-04-01_오후_6-53-59.gif)

                                         다른 사람이 작성을 완료했을 경우 자동으로 렌더링

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f02f8f94-9979-4dc2-afa4-3e28baf0d954/Untitled.png)

미완성 작품은 작성 버튼이 있다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8d0a90fb-154a-4720-9115-1bbb828442be/Untitled.png)

완성 작품은 작성 버튼이 없다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1b979281-ed01-4863-bbe0-7a084c04938f/Untitled.png)

                                             댓글 보기 버튼을 통해 댓글창을 띄울 수 있다.

1. 기능
- 소설 문단 작성하기
    - 다른 유저가 문단을 작성하고 있지 않다면 ‘작성 시작하기’ 버튼을 눌러 작성을 시작할 수 있다.
    - 이 때 작성을 시작한 유저가 아닌 다른 유저들은 Socket통신을 통해 버튼을 비활성화한다.
    - 문단을 유저가 완성을 시키면 페이지의 모든 유저들에게 Socket통신을 통해 알려주고 재랜더링하여 내용을 실시간으로 보여준다.
- 문장 좋아요
    - 유저 프로필 사진 혹은 아래 하트를 클릭하여 문단을 좋아요 누를 수 있다.
- 작성 가능 문단 수
    - 책 표지 하단 우측에 표시
    - 작성 가능 횟수 확인 가능
- 댓글 기능
    - 아래 댓글보기 버튼을 눌러 댓글창을 띄운다.

---

> 8. 유저페이지(본인 / 타인)
> 
1. 페이지 화면

![GIF 2022-04-01 오후 7-11-52.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/caad90de-4b6c-430c-a563-533ded048daa/GIF_2022-04-01_오후_7-11-52.gif)

1. 기능
    - 참여작, 북마크한 작품, 좋아요한 작품 확인 가능
        - 각 항목을 선택하면 게시물들이 출력.
    - 로그아웃 기능
    - 톱니바퀴 아이콘(설정) 클릭을 통해 ‘프로필 수정 페이지’로 이동 가능.

---

> 11. 프로필 수정 페이지
> 
1. 페이지 화면

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/397e7fb1-b64b-4e6d-8437-57994a011f03/Untitled.png)

1. 기능
    - 프로필 사진, 닉네임, 소개 수정 가능.
